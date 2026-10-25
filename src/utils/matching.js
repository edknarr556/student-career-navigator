// Simple, transparent career-matching algorithm.
//
// It scores each job against a student's profile using five weighted signals:
//   1. Skill overlap (profile skills vs. job skills)             (up to 40%)
//   2. Major match (profile major vs. job's major tags/field)    (up to 30%)
//   3. Career field vs. interests keywords                        (up to 12%)
//   4. Employment type / location preference                      (up to 10%)
//   5. Evidence of relevant skills in previous-experience text    (up to 8%)
//
// No AI or external APIs are used — the score is fully deterministic and every
// reason, matched qualification, and missing qualification is derived from the
// same comparison, so recommendations are completely explainable and testable.
//
// Because every signal reads live values off the profile, editing the profile
// (major, academic year, skills, experience, location, job type, interests)
// genuinely changes which jobs rank highest and why — nothing is hardcoded.
//
// Undergraduate eligibility: jobs tagged requiresGradDegreeOrLicense are NOT
// presented as immediately eligible for undergraduates — they are heavily
// down-ranked and flagged in the explanation.

import { MAJOR_FIELD_MAP, MAJOR_SKILLS } from '../data/majors.js';

function normalize(text) {
  return String(text || '').toLowerCase().trim();
}

// The academic years considered undergraduate for eligibility filtering.
const UNDERGRAD_YEARS = ['freshman', 'sophomore', 'junior', 'senior', ''];

function isUndergrad(profile) {
  return UNDERGRAD_YEARS.includes(normalize(profile.academicYear));
}

// Returns the list of a job's skills the student already lists.
function matchingSkills(profile, job) {
  const profileSkills = (profile.skills || []).map(normalize);
  return (job.skills || []).filter((skill) =>
    profileSkills.includes(normalize(skill))
  );
}

// Job skills the student does NOT list (the skill gap to close).
function missingSkills(profile, job) {
  const profileSkills = (profile.skills || []).map(normalize);
  return (job.skills || []).filter(
    (skill) => !profileSkills.includes(normalize(skill))
  );
}

// Skills evidenced in the free-text previous-experience summary.
function experienceEvidence(profile, job, alreadyMatched) {
  const text = normalize(profile.experience);
  if (!text) return [];
  const matchedSet = new Set(alreadyMatched.map(normalize));
  return (job.skills || []).filter((skill) => {
    const s = normalize(skill);
    return !matchedSet.has(s) && s.length > 1 && text.includes(s);
  });
}

// Fields a major relates to (from the explicit mapping), always including the
// major name itself so custom majors still work.
function fieldsForMajor(major) {
  const mapped = MAJOR_FIELD_MAP[major] || [];
  const all = [major, ...mapped].map(normalize).filter(Boolean);
  return Array.from(new Set(all));
}

// MAJOR MATCH: does this job's field / major-tags line up with the student's
// major? Returns 1 (direct), 0.6 (related field), or 0 (unrelated).
function majorRelevance(profile, job) {
  const major = profile.major;
  if (!major) return 0;

  const jobMajors = (job.majors || []).map(normalize);
  const jobField = normalize(job.field);
  const majorNorm = normalize(major);

  // Direct: the job is explicitly tagged for this exact major.
  if (jobMajors.includes(majorNorm) || jobField === majorNorm) return 1;

  // Related: the job's field is in the major's mapped field list, or one of the
  // job's major tags is in that list.
  const relatedFields = fieldsForMajor(major);
  const directOnField = relatedFields.includes(jobField);
  const directOnTags = jobMajors.some((m) => relatedFields.includes(m));
  if (directOnField || directOnTags) return 0.6;

  return 0;
}

// INTEREST MATCH against the job field (kept separate from major so interests
// can surface cross-disciplinary jobs).
function interestRelevance(profile, job) {
  const haystack = (profile.interests || []).map(normalize).join(' ');
  if (!haystack) return 0;
  const field = normalize(job.field);
  const fieldWords = field.split(/\s+/).filter((w) => w.length > 2);
  if (haystack.includes(field)) return 1;
  if (fieldWords.some((word) => haystack.includes(word))) return 0.6;
  // Also credit interest keywords appearing in the job title.
  const title = normalize(job.title);
  const interestWords = haystack.split(/[^a-z]+/).filter((w) => w.length > 3);
  if (interestWords.some((w) => title.includes(w))) return 0.5;
  return 0;
}

// PREFERENCE MATCH: employment type + location.
function preferenceRelevance(profile, job) {
  let score = 0;
  if (
    profile.preferredType &&
    normalize(profile.preferredType) === normalize(job.employmentType)
  ) {
    score += 0.6;
  }
  const prefLoc = normalize(profile.preferredLocation);
  const jobLoc = normalize(job.location);
  if (prefLoc && jobLoc) {
    const prefTokens = prefLoc.split(/[^a-z]+/).filter((t) => t.length > 2);
    const locationMatch = prefTokens.some((token) => jobLoc.includes(token));
    const remotePref = prefLoc.includes('remote') && jobLoc.includes('remote');
    if (locationMatch || remotePref) score += 0.4;
  }
  return Math.min(score, 1);
}

// If the student listed few of their own skills, lend a little weight to skills
// typical of their major so the major still nudges ranking. Student-listed
// skills always dominate because they feed the much larger skill signal.
function majorSkillAssist(profile, job) {
  const majorSkills = (MAJOR_SKILLS[profile.major] || []).map(normalize);
  if (majorSkills.length === 0) return 0;
  const jobSkills = (job.skills || []).map(normalize);
  const overlap = jobSkills.filter((s) => majorSkills.includes(s));
  return jobSkills.length ? overlap.length / jobSkills.length : 0;
}

/**
 * Compute a match result for a single job.
 * @returns {{
 *   percentage, reasons, matchedSkills, missingSkills, experienceSkills,
 *   missingQualifications, eligibilityNote, notImmediatelyEligible
 * }}
 */
export function scoreJob(profile, job) {
  if (!profile) {
    return {
      percentage: 0, reasons: [], matchedSkills: [],
      missingSkills: [...(job.skills || [])], experienceSkills: [],
      missingQualifications: [...(job.qualifications || [])],
      eligibilityNote: '', notImmediatelyEligible: false,
    };
  }

  const SKILL_WEIGHT = 40;
  const MAJOR_WEIGHT = 30;
  const INTEREST_WEIGHT = 12;
  const PREF_WEIGHT = 10;
  const EXP_WEIGHT = 8;

  const matched = matchingSkills(profile, job);
  const missing = missingSkills(profile, job);
  const totalJobSkills = (job.skills || []).length || 1;
  const skillRatio = matched.length / totalJobSkills;

  const major = majorRelevance(profile, job);
  const interest = interestRelevance(profile, job);
  const pref = preferenceRelevance(profile, job);

  const expSkills = experienceEvidence(profile, job, matched);
  const expRatio = Math.min(expSkills.length / totalJobSkills, 1);

  // Blend direct skill overlap with a small major-skill assist (max 0.25 of
  // the skill signal) so a sparse-skills profile still leans toward its major.
  const assist = majorSkillAssist(profile, job);
  const effectiveSkillRatio = Math.min(1, skillRatio + assist * 0.25);

  let percentage = Math.round(
    effectiveSkillRatio * SKILL_WEIGHT +
      major * MAJOR_WEIGHT +
      interest * INTEREST_WEIGHT +
      pref * PREF_WEIGHT +
      expRatio * EXP_WEIGHT
  );

  // Eligibility: undergraduates should not see license/grad-degree roles as
  // immediately eligible. Heavily down-rank and flag them.
  const notImmediatelyEligible =
    !!job.requiresGradDegreeOrLicense && isUndergrad(profile);
  if (notImmediatelyEligible) {
    percentage = Math.round(percentage * 0.3);
  }

  if (
    !notImmediatelyEligible &&
    (matched.length > 0 || major > 0 || interest > 0 || expSkills.length > 0)
  ) {
    percentage = Math.max(percentage, 35);
  }
  percentage = Math.min(percentage, 99);

  const missingQualifications = missing; // skills gap drives "missing quals"
  const eligibilityNote = notImmediatelyEligible
    ? `Not an immediately-eligible role for undergraduates — requires: ${(job.qualifications || [])
        .filter((q) => /license|doctoral|graduate|master|phd|psyd|bsn/i.test(q))
        .join('; ') || 'an advanced degree or professional license'}.`
    : '';

  const reasons = buildReasons(
    profile, job, matched, major, interest, pref, expSkills, notImmediatelyEligible
  );

  return {
    percentage,
    reasons,
    matchedSkills: matched,
    missingSkills: missing,
    experienceSkills: expSkills,
    missingQualifications,
    eligibilityNote,
    notImmediatelyEligible,
  };
}

function buildReasons(profile, job, matched, major, interest, pref, expSkills, ineligible) {
  const reasons = [];

  if (major === 1) {
    reasons.push(`Directly matches your ${profile.major} major.`);
  } else if (major > 0) {
    reasons.push(`Relates to your ${profile.major} major and the ${job.field} field.`);
  }

  if (matched.length > 0) {
    reasons.push(`Matches your skills in ${matched.slice(0, 4).join(', ')}.`);
  }

  if (interest > 0 && (profile.interests || []).length) {
    reasons.push(`Aligns with your interests (${job.field}).`);
  }

  if (expSkills.length > 0) {
    reasons.push(
      `Your previous experience shows exposure to ${expSkills.slice(0, 3).join(', ')}.`
    );
  }

  if (
    profile.preferredType &&
    normalize(profile.preferredType) === normalize(job.employmentType)
  ) {
    reasons.push(`Fits your preferred job type (${job.employmentType}).`);
  }

  if (pref > 0 && job.location) {
    const prefLoc = normalize(profile.preferredLocation);
    const jobLoc = normalize(job.location);
    const prefTokens = prefLoc.split(/[^a-z]+/).filter((t) => t.length > 2);
    if (
      prefTokens.some((token) => jobLoc.includes(token)) ||
      (prefLoc.includes('remote') && jobLoc.includes('remote'))
    ) {
      reasons.push(`Located where you prefer (${job.location}).`);
    }
  }

  if (ineligible) {
    reasons.push(
      'Shown for awareness only — not immediately eligible for undergraduates (advanced degree or license required).'
    );
  }

  if (reasons.length === 0) {
    reasons.push(
      'A general opportunity worth exploring as you build relevant skills and experience.'
    );
  }

  return reasons;
}

/**
 * Rank all jobs for a profile, highest match first (deterministic).
 */
export function rankJobs(profile, jobs) {
  return jobs
    .map((job) => ({ ...job, match: scoreJob(profile, job) }))
    .sort(scoreCompare);
}

function scoreCompare(a, b) {
  if (b.match.percentage !== a.match.percentage) {
    return b.match.percentage - a.match.percentage;
  }
  if (b.match.matchedSkills.length !== a.match.matchedSkills.length) {
    return b.match.matchedSkills.length - a.match.matchedSkills.length;
  }
  return String(a.id).localeCompare(String(b.id));
}

/**
 * Generate the top N profile-driven recommendations (default 3).
 *
 * Powers the "Generate New Matches" button. Ranks the FULL dataset against the
 * CURRENT profile and returns the strongest matches, each with matching
 * qualifications and missing qualifications. Immediately-eligible roles are
 * preferred; grad/license-only roles are only included as a last resort.
 */
export function generateMatches(profile, jobs, count = 3) {
  const ranked = rankJobs(profile, jobs);

  const eligible = ranked.filter((j) => !j.match.notImmediatelyEligible);
  const withSignal = eligible.filter(
    (j) =>
      j.match.matchedSkills.length > 0 ||
      j.match.experienceSkills.length > 0 ||
      j.match.percentage >= 35
  );

  let pool;
  if (withSignal.length >= count) pool = withSignal;
  else if (eligible.length >= count) pool = eligible;
  else pool = ranked;

  return pool.slice(0, count);
}

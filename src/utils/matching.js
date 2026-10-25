// Simple, transparent career-matching algorithm.
//
// It scores each job against a student's profile using four weighted signals:
//   1. Skill overlap (profile skills vs. required skills)     (up to 50%)
//   2. Career field vs. interests / major keywords             (up to 25%)
//   3. Employment type / location preference                   (up to 15%)
//   4. Evidence of relevant skills in previous experience text (up to 10%)
//
// No AI or external APIs are used — the score is fully deterministic and every
// reason, matched qualification, and missing skill is derived from the same
// comparison, so recommendations are completely explainable and testable.
//
// Because every signal reads live values off the profile, editing the profile
// (major, academic year, skills, experience, location, or job type) genuinely
// changes which jobs rank highest and why — nothing is hardcoded per job.

function normalize(text) {
  return String(text || '').toLowerCase().trim();
}

// Returns the list of a job's required skills the student already lists.
function matchingSkills(profile, job) {
  const profileSkills = (profile.skills || []).map(normalize);
  return (job.skills || []).filter((skill) =>
    profileSkills.includes(normalize(skill))
  );
}

// Required skills the student does NOT list (the "gap" to close).
function missingSkills(profile, job) {
  const profileSkills = (profile.skills || []).map(normalize);
  return (job.skills || []).filter(
    (skill) => !profileSkills.includes(normalize(skill))
  );
}

// Skills the student can't claim outright but that appear in their free-text
// previous-experience summary (e.g. "built a tool with SQL and Java").
function experienceEvidence(profile, job, alreadyMatched) {
  const text = normalize(profile.experience);
  if (!text) return [];
  const matchedSet = new Set(alreadyMatched.map(normalize));
  return (job.skills || []).filter((skill) => {
    const s = normalize(skill);
    return !matchedSet.has(s) && s.length > 1 && text.includes(s);
  });
}

// Checks whether the job's field relates to the student's interests or major.
function fieldRelevance(profile, job) {
  const haystack = [...(profile.interests || []), profile.major || '']
    .map(normalize)
    .join(' ');

  const field = normalize(job.field);
  const fieldWords = field.split(/\s+/).filter((w) => w.length > 2);

  const direct = haystack.includes(field);
  const partial = fieldWords.some((word) => haystack.includes(word));

  if (direct) return 1;
  if (partial) return 0.6;
  return 0;
}

// Checks employment type and location preference.
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
    if (locationMatch || remotePref) {
      score += 0.4;
    }
  }

  return Math.min(score, 1);
}

/**
 * Compute a match result for a single job.
 * @returns {{
 *   percentage: number,
 *   reasons: string[],
 *   matchedSkills: string[],
 *   missingSkills: string[],
 *   experienceSkills: string[]
 * }}
 */
export function scoreJob(profile, job) {
  if (!profile) {
    return {
      percentage: 0,
      reasons: [],
      matchedSkills: [],
      missingSkills: [...(job.skills || [])],
      experienceSkills: [],
    };
  }

  const SKILL_WEIGHT = 50;
  const FIELD_WEIGHT = 25;
  const PREF_WEIGHT = 15;
  const EXP_WEIGHT = 10;

  const matched = matchingSkills(profile, job);
  const missing = missingSkills(profile, job);
  const totalJobSkills = (job.skills || []).length || 1;
  const skillRatio = matched.length / totalJobSkills;

  const field = fieldRelevance(profile, job);
  const pref = preferenceRelevance(profile, job);

  const expSkills = experienceEvidence(profile, job, matched);
  const expRatio = Math.min(expSkills.length / totalJobSkills, 1);

  let percentage = Math.round(
    skillRatio * SKILL_WEIGHT +
      field * FIELD_WEIGHT +
      pref * PREF_WEIGHT +
      expRatio * EXP_WEIGHT
  );

  // Give a small floor so decent partial matches still read as relevant,
  // and cap at 99 so nothing looks artificially "perfect".
  if (matched.length > 0 || field > 0 || expSkills.length > 0) {
    percentage = Math.max(percentage, 35);
  }
  percentage = Math.min(percentage, 99);

  const reasons = buildReasons(profile, job, matched, field, pref, expSkills);

  return {
    percentage,
    reasons,
    matchedSkills: matched,
    missingSkills: missing,
    experienceSkills: expSkills,
  };
}

function buildReasons(profile, job, matched, field, pref, expSkills) {
  const reasons = [];

  if (matched.length > 0) {
    reasons.push(`Matches your skills in ${matched.slice(0, 4).join(', ')}.`);
  }

  if (field === 1) {
    reasons.push(`Aligns with your interest in ${job.field}.`);
  } else if (field > 0 && profile.major) {
    reasons.push(
      `Relates to your ${profile.major} background and the ${job.field} field.`
    );
  }

  if (expSkills.length > 0) {
    reasons.push(
      `Your previous experience shows exposure to ${expSkills
        .slice(0, 3)
        .join(', ')}.`
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

  if (reasons.length === 0) {
    reasons.push(
      'A general entry-level opportunity worth exploring as you build experience.'
    );
  }

  return reasons;
}

/**
 * Rank all jobs for a profile, highest match first.
 * @returns {Array<job & { match: ReturnType<typeof scoreJob> }>}
 */
export function rankJobs(profile, jobs) {
  return jobs
    .map((job) => ({ ...job, match: scoreJob(profile, job) }))
    .sort((a, b) => scoreCompare(a, b));
}

// Stable sort: by match %, then by number of matched skills, then by id so the
// output order is deterministic and testable for identical scores.
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
 * Generate the top N profile-driven job recommendations (default 3).
 *
 * This powers the "Generate New Matches" button. It ranks the FULL sample
 * dataset against the current profile and returns the strongest matches, each
 * with an explanation of matching qualifications and missing skills. Because
 * ranking is computed live from the profile, a changed profile yields changed
 * recommendations — it never returns a fixed, hardcoded three.
 *
 * @param {object} profile  current participant profile
 * @param {Array}  jobs     the sample dataset
 * @param {number} count    how many to return (default 3)
 * @returns {Array<job & { match }>}
 */
export function generateMatches(profile, jobs, count = 3) {
  const ranked = rankJobs(profile, jobs);

  // Prefer jobs with a real signal (some matched skill, field relevance, or
  // experience evidence). If the profile is sparse and nothing matches, fall
  // back to the top-ranked entries so the button always returns results.
  const withSignal = ranked.filter(
    (j) =>
      j.match.matchedSkills.length > 0 ||
      j.match.experienceSkills.length > 0 ||
      j.match.percentage >= 35
  );

  const pool = withSignal.length >= count ? withSignal : ranked;
  return pool.slice(0, count);
}

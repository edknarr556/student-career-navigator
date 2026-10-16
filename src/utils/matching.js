// Simple, transparent career-matching algorithm.
//
// It scores each job against a student's profile using three weighted signals:
//   1. Skill overlap       (up to 55%)
//   2. Career field vs. interests / major keywords (up to 30%)
//   3. Employment type / location preference        (up to 15%)
//
// No AI or external APIs are used — the score is fully deterministic and the
// reasons are generated from the same comparison, so recommendations are
// explainable.

function normalize(text) {
  return String(text || '').toLowerCase().trim();
}

// Returns the list of profile skills that appear in a job's required skills.
function matchingSkills(profile, job) {
  const profileSkills = (profile.skills || []).map(normalize);
  return (job.skills || []).filter((skill) =>
    profileSkills.includes(normalize(skill))
  );
}

// Checks whether the job's field relates to the student's interests or major.
function fieldRelevance(profile, job) {
  const haystack = [
    ...(profile.interests || []),
    profile.major || '',
  ]
    .map(normalize)
    .join(' ');

  const field = normalize(job.field);
  const fieldWords = field.split(/\s+/).filter((w) => w.length > 2);

  // Direct field name mention, or any significant field word appears.
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
 * @returns {{ percentage: number, reasons: string[], matchedSkills: string[] }}
 */
export function scoreJob(profile, job) {
  if (!profile) {
    return { percentage: 0, reasons: [], matchedSkills: [] };
  }

  const SKILL_WEIGHT = 55;
  const FIELD_WEIGHT = 30;
  const PREF_WEIGHT = 15;

  const matched = matchingSkills(profile, job);
  const totalJobSkills = (job.skills || []).length || 1;
  const skillRatio = matched.length / totalJobSkills;

  const field = fieldRelevance(profile, job);
  const pref = preferenceRelevance(profile, job);

  let percentage = Math.round(
    skillRatio * SKILL_WEIGHT + field * FIELD_WEIGHT + pref * PREF_WEIGHT
  );

  // Give a small floor so decent partial matches still read as relevant,
  // and cap at 99 so nothing looks artificially "perfect".
  if (matched.length > 0 || field > 0) {
    percentage = Math.max(percentage, 35);
  }
  percentage = Math.min(percentage, 99);

  const reasons = buildReasons(profile, job, matched, field, pref);

  return { percentage, reasons, matchedSkills: matched };
}

function buildReasons(profile, job, matched, field, pref) {
  const reasons = [];

  if (matched.length > 0) {
    const list = matched.slice(0, 4).join(', ');
    reasons.push(`Matches your skills in ${list}.`);
  }

  if (field === 1) {
    reasons.push(
      `Aligns with your interest in ${job.field}.`
    );
  } else if (field > 0 && profile.major) {
    reasons.push(
      `Relates to your ${profile.major} background and the ${job.field} field.`
    );
  }

  if (
    profile.preferredType &&
    normalize(profile.preferredType) === normalize(job.employmentType)
  ) {
    reasons.push(`Fits your preferred employment type (${job.employmentType}).`);
  }

  if (pref > 0 && job.location) {
    const prefLoc = normalize(profile.preferredLocation);
    const jobLoc = normalize(job.location);
    const prefTokens = prefLoc.split(/[^a-z]+/).filter((t) => t.length > 2);
    if (
      prefTokens.some((token) => jobLoc.includes(token)) ||
      (prefLoc.includes('remote') && jobLoc.includes('remote'))
    ) {
      reasons.push(`Located in a place you prefer (${job.location}).`);
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
    .sort((a, b) => b.match.percentage - a.match.percentage);
}

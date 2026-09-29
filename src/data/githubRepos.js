const GITHUB_API_ROOT = 'https://api.github.com/users';

function formatRepositoryName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(date) {
  if (!date) return 'Recently updated';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function getAccent(index) {
  return ['green', 'blue', 'orange'][index % 3];
}

function toProject(repo, index) {
  const topicSkills = Array.isArray(repo.topics) ? repo.topics : [];
  const skills = [repo.language, ...topicSkills].filter(Boolean).slice(0, 5);
  const stats = [
    `${repo.stargazers_count || 0} star${repo.stargazers_count === 1 ? '' : 's'}`,
    `${repo.forks_count || 0} fork${repo.forks_count === 1 ? '' : 's'}`,
  ];

  return {
    number: `GH/${String(index + 1).padStart(2, '0')}`,
    title: formatRepositoryName(repo.name),
    category: repo.language ? `GitHub / ${repo.language}` : 'GitHub repository',
    period: `Updated ${formatDate(repo.pushed_at)}`,
    description: repo.description || 'A public repository by KM Mubin. Open it on GitHub to explore the code and documentation.',
    details: [
      ...stats,
      repo.archived ? 'Archived repository' : 'Public repository',
    ],
    skills: skills.length ? skills : ['GitHub', 'Open source'],
    accent: getAccent(index),
    url: repo.html_url,
    cta: 'View on GitHub',
    source: 'github',
  };
}

async function fetchRepositoryPage(username, page) {
  const response = await fetch(`${GITHUB_API_ROOT}/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=updated`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch all public repositories owned by a GitHub user and map them to the
 * same shape used by the local project cards. The local JSON projects remain
 * the fallback when the public GitHub API is unavailable or empty.
 */
export async function getGitHubProjects({
  username,
  includeForks = false,
  includeArchived = false,
  exclude = [],
} = {}) {
  if (!username) return [];

  const repositories = [];
  let page = 1;

  while (page <= 10) {
    const batch = await fetchRepositoryPage(username, page);
    repositories.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  const excludedNames = new Set(exclude.map((name) => name.toLowerCase()));

  return repositories
    .filter((repo) => includeForks || !repo.fork)
    .filter((repo) => includeArchived || !repo.archived)
    .filter((repo) => !excludedNames.has(repo.name.toLowerCase()))
    .sort((first, second) => new Date(second.pushed_at) - new Date(first.pushed_at))
    .map(toProject);
}

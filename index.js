async function getStarredRepos(githubUsername) {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    const result = await response.json();
    console.log(result);
    return result.filter(repo => repo.stargazers_count > 0)
}

(async function() {
    const GITHUB_USERNAME = "naman09"
    console.log(await getStarredRepos(GITHUB_USERNAME));
})();
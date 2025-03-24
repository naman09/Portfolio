async function getStarredRepos(githubUsername) {
    const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos`
    );
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result.filter((repo) => repo.stargazers_count > 0);
}

function getProjectCardHTML() {}
async function fillRepoDetails(repo) {
    document.getElementById("project-name").innerHTML = repo.name;

    document.getElementById("project-description").innerHTML =
        await getProjectDescription(repo);

    document.getElementById("project-last-updated-date").innerHTML = new Date(
        repo.updated_at
    ).toDateString();

    document.getElementById("project-url").href = repo.html_url;
}
async function getProjectDescription(repo) {
    if (repo.description) {
        return repo.description;
    }
    const response = await fetch(
        `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/README.md`
    );
    console.log(response);
    const mdText = await response.text();
    const normalText = mdText.replace(/[^a-zA-Z ]/g, " ");
    return (
        normalText.slice(0, 100) +
        (normalText.length > 100
            ? `<a href="${repo.html_url}/blob/main/README.md" target="_blank">...</a>`
            : "")
    );
}

(async function () {
    const GITHUB_USERNAME = "naman09";
    const repos = await getStarredRepos(GITHUB_USERNAME);
    console.log(repos);
    await fillRepoDetails(repos[0]);
})();

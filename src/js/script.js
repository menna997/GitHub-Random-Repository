const language = document.getElementById("language");

const message = document.getElementById("message");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

const repoCard = document.getElementById("repoCard");
const refreshBtn = document.getElementById("refreshBtn");

const repoName = document.getElementById("repoName");
const repoDescription = document.getElementById("repoDescription");
const repoLanguage = document.getElementById("repoLanguage");
const repoStars = document.getElementById("repoStars");
const repoForks = document.getElementById("repoForks");
const repoIssues = document.getElementById("repoIssues");

/* =========================
   STATES
========================= */

function setEmpty() {
    message.classList.add("show");

    loading.classList.remove("show");
    errorBox.classList.remove("show");
    repoCard.classList.remove("show");
    refreshBtn.classList.remove("show");
}

function setLoading() {
    message.classList.remove("show");

    loading.classList.add("show");

    errorBox.classList.remove("show");
    repoCard.classList.remove("show");
    refreshBtn.classList.remove("show");
}

function setError() {
    message.classList.remove("show");
    loading.classList.remove("show");

    errorBox.classList.add("show");

    repoCard.classList.remove("show");
    refreshBtn.classList.remove("show");
}

function setSuccess() {
    message.classList.remove("show");
    loading.classList.remove("show");
    errorBox.classList.remove("show");

    repoCard.classList.add("show");
    refreshBtn.classList.add("show");
}

/* =========================
   FETCH DATA
========================= */

async function getRepo() {
    const lang = language.value;

    if (!lang) {
        setEmpty();
        return;
    }

    setLoading();

    try {
        const page = Math.floor(Math.random() * 10) + 1;

        const res = await fetch(
            `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&page=${page}`
        );

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();

        if (!data.items || data.items.length === 0) {
            setError();
            return;
        }

        const repo = data.items[Math.floor(Math.random() * data.items.length)];

        repoName.textContent = repo.name;
        repoDescription.textContent = repo.description || "No description available";
        repoLanguage.textContent = repo.language || "N/A";
        repoStars.textContent = repo.stargazers_count;
        repoForks.textContent = repo.forks_count;
        repoIssues.textContent = repo.open_issues_count;

        setSuccess();

    } catch (err) {
        setError();
    }
}

/* =========================
   EVENTS
========================= */

language.addEventListener("change", getRepo);
refreshBtn.addEventListener("click", getRepo);

/* =========================
   INIT
========================= */

setEmpty();
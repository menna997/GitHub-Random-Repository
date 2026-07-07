"use strict";

const languageSelect = document.querySelector(".repository__select");

const messageBox = document.querySelector(".repository__message");
const messageText = document.querySelector(".repository__message-text");

const repoCard = document.querySelector(".repository__card");

const repoName = document.querySelector(".repository__card-title");
const repoDescription = document.querySelector(".repository__card-description");

const repoLanguage = document.querySelector(".repository__language-text");
const repoStars = document.querySelector(".repository__stars");
const repoForks = document.querySelector(".repository__forks");
const repoIssues = document.querySelector(".repository__issues");
const languageDot = document.querySelector(".repository__language-dot");

const refreshButton = document.querySelector(".repository__button--refresh");
const retryButton = document.querySelector(".repository__button--retry");

/*
    STATE HANDLER
*/

function setState(type, text = "") {

    messageBox.className = "repository__message";

    repoCard.classList.remove("show");
    refreshButton.classList.remove("show");

    retryButton.style.display = "none";

    if (type === "success") {

        messageBox.style.display = "none";

        repoCard.classList.add("show");
        refreshButton.classList.add("show");

        return;
    }


    messageBox.classList.add(`repository__message--${type}`);
    messageBox.style.display = "block";
    messageText.textContent = text;

    if (type === "error") {
        retryButton.style.display = "block";
    }
}


/*
    FETCH REPOSITORY
*/

async function getRepository() {

    const language = languageSelect.value;


    if (!language) {

        setState(
            "empty",
            "Please select a language"
        );

        return;
    }


    setState(
        "loading",
        "Loading, please wait..."
    );


    try {

        const page = Math.floor(Math.random() * 50) + 1;


        const response = await fetch(
            `https://api.github.com/search/repositories?q=language:${language}&sort=stars&page=${page}`
        );


        if (!response.ok) {

            throw new Error("API Error");

        }


        const data = await response.json();


        if (!data.items || data.items.length === 0) {

            setState(
                "error",
                "No repositories found"
            );

            return;
        }


        const repo = data.items[0];


        repoName.textContent = repo.name;

        repoDescription.textContent =
            repo.description || "No description available";


        repoLanguage.textContent = repo.language || "N/A";
        repoStars.textContent = repo.stargazers_count;
        repoForks.textContent = repo.forks_count;
        repoIssues.textContent = repo.open_issues_count;

        setState("success");


    } catch (error) {


        setState(
            "error",
            "Error fetching repositories"
        );

    }

}


/*
    EVENTS
*/

languageSelect.addEventListener(
    "change",
    getRepository
);


refreshButton.addEventListener(
    "click",
    getRepository
);


retryButton.addEventListener(
    "click",
    getRepository
);



/*
    INITIAL STATE
*/

setState(
    "empty",
    "Please select a language"
);
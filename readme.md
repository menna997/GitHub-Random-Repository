# GitHub Repository Finder

A simple web application that allows users to discover random GitHub repositories based on a selected programming language.

##  Features

* Select a programming language.
* Fetch repositories using the GitHub REST API.
* Display a random repository from the search results.
* View repository details:

  * Repository name
  * Description
  * Programming language
  * Stars count
  * Forks count
  * Open issues count
* Loading state while fetching data.
* Error state with a retry button.
* Refresh button to load another random repository.

## Technologies Used

* HTML5
* SCSS
* JavaScript (ES6+)
* GitHub REST API

##  Project Structure

```text
.
├── index.html
├── README.md
└── src
    ├── css
    │   └── style.css
    ├── scss
    │   ├── _global.scss
    │   ├── _variables.scss
    │   └── style.scss
    └── js
        └── script.js
```

##  GitHub API

This project uses the GitHub Search Repositories API:

```
https://api.github.com/search/repositories
```

Example request:

```
https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100
```

##  Getting Started

1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser.

No additional dependencies or installation are required.

##  Preview

You can add a screenshot of the application here.

##  License

This project is created for learning and practice purposes.

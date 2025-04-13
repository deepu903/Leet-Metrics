document.addEventListener("DOMContentLoaded", () => {


    const searchBtn = document.querySelector("#search-btn");
    const usernameInput = document.querySelector("#user-input");
    const statsContainer = document.querySelector(".stats-container");
    const circle = document.querySelectorAll(".circle");
    const easyCircle = document.querySelector(".easy-progress");
    const mediumCircle = document.querySelector(".mid-progress");
    const hardCircle = document.querySelector(".hard-progress")
    const easyLabel = document.querySelector("#easy-label");
    const mediumLabel = document.querySelector("#medium-label");
    const hardLabel = document.querySelector("#hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");

    const validUsername = (username) => {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username")
        }
        return isMatching;
    }

    const fetchUserDetails = async (username) => {
        const URL = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error("Unable to fetch the User Details");
            }
            const parsedData = await response.json();
            console.log("Logging data:", parsedData);
            displayUserData(parsedData);
        }
        catch (err) {
            statsContainer.innerHTML = `<p>No data Found</p>`;
        }
        finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        };
    };

    const updateProgress = (solved, total, label, circle) => {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        //label.textContent = `${solved}/${total}`;
        label.textContent = `${Math.floor(progressDegree)}%`
        console.log(Math.floor(progressDegree));

    }

    const displayUserData = (parsedData) => {
        const totalQuestion = parsedData.totalQuestions;
        console.log(totalQuestion);
        const easyQuestion = parsedData.totalEasy;
        console.log(easyQuestion);
        const mediumQuestion = parsedData.totalMedium;
        console.log(mediumQuestion);
        const hardQuestion = parsedData.totalHard;
        console.log(hardQuestion);

        const totalSolvedQuestion = parsedData.totalSolved;
        console.log(totalSolvedQuestion);
        const totalEasySolved = parsedData.easySolved;
        console.log(totalEasySolved);
        const totalMediumSolved = parsedData.mediumSolved;
        console.log(totalMediumSolved);
        const totalHardSolved = parsedData.hardSolved;
        console.log(totalHardSolved);

        updateProgress(totalEasySolved, easyQuestion, easyLabel, easyCircle);
        updateProgress(totalMediumSolved, mediumQuestion, mediumLabel, mediumCircle);
        updateProgress(totalHardSolved, hardQuestion, hardLabel, hardCircle);

        const cardData = [
            {label: "Overall Acceptance rate:", value: parsedData.acceptanceRate},
            {label: "Overall Contribution:", value: parsedData.contributionPoints},
            {label: "Overall Ranking:", value: parsedData.ranking},
            {label: "Overall Total Solved:", value: totalSolvedQuestion}
        ];
        console.log(cardData);

        cardStatsContainer.innerHTML = cardData.map(
            data => {
                return`
                    <div class="card">
                        <h3>${data.label}</h3>
                        <p>${data.value}</p>
                    </div>
                `
            }
        ).join("")

    }

    searchBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        console.log(username);
        if (validUsername(username)) {
            fetchUserDetails(username)
        };

    });


});
const userName = document.querySelector('.searchBox > input');
const searchButton = document.querySelector('.searchBox > button');
const profilePic = document.querySelector('.userProfilePic > img');
const userBio = document.querySelector('.userBio > p');
const profileCard = document.querySelector('.userGithubProfileCard');
let errorMsg = document.querySelector('.userGithubProfileCard > h2')

// Function to perform the search
const performSearch = () => {
    let searchValue = userName.value.trim();
    if (!searchValue) {
        alert('Please enter a username');
    } else {
        const requestUrl = `https://api.github.com/users/${searchValue}`;

        fetch(requestUrl)
            .then((response) => {
                if (!response.ok) {
                    // Manually throw an error with custom message based on status code
                    throw new Error(response.status === 404 ? "Not Found" : "Failed to fetch");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                profilePic.src = data.avatar_url
                profilePic.alt = searchValue
                profilePic.title = searchValue

                if (!data.bio) {
                    userBio.textContent = `Hi 👋🏻, I'm ${searchValue}`;
                } else {
                    userBio.textContent = data.bio;
                }
                profileCard.style.justifyContent = 'start';
                profileCard.style.paddingTop = '20px';
                profileCard.style.gap = '15px';
                errorMsg.innerHTML = '';
                document.querySelector('.userFollower').innerHTML = `Followers: ${data.followers}`;
                document.querySelector('.userFollowing').textContent = `Following: ${data.following}`;
            })
            .catch((error) => {
                console.log(error);

                if (error.message === "Failed to fetch" || error.message === "TypeError: Failed to fetch") {
                    errorMsg.textContent = 'Please check your internet connection!';
                    errorMsg.style.color = 'red';
                } else {
                    errorMsg.textContent = 'An error occurred!';
                    errorMsg.style.color = 'red';
                }
            });
    }
};

// Search when clicking the button
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
});

// Search when pressing Enter in the input field
userName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
    }
});

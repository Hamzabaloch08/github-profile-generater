const userName = document.querySelector('.searchBox > input');
const searchButton = document.querySelector('.searchBox > button');
const profilePic = document.querySelector('.userProfilePic > img');
const userBio = document.querySelector('.userBio > p');
const profileCard = document.querySelector('.userGithubProfileCard');
let errorMsg = document.querySelector('.userGithubProfileCard > h2')
let follower = document.querySelector('.userFollower')
let following = document.querySelector('.userFollowing')

// Function to update profile details
const updateProfile = (data) => {
    profilePic.src = data.avatar_url;
    profilePic.alt = data.login;
    profilePic.title = data.login;

    if (!data.bio) {
        userBio.textContent = `Hi 👋🏻, I'm ${searchValue}`;
    } else {
        userBio.textContent = data.bio;
    }

    follower.textContent = `Followers: ${data.followers}`;
    following.textContent = `Following: ${data.following}`;

    profileCard.style.justifyContent = 'start';
    profileCard.style.paddingTop = '20px';
    profileCard.style.gap = '15px';
    errorMsg.textContent = '';
};

// Function to reset profile details on error
const resetProfile = (errorText) => {
    errorMsg.textContent = errorText;
    errorMsg.style.color = 'red';

    profileCard.style.justifyContent = 'center';
    profileCard.style.paddingTop = '0px';
    profileCard.style.gap = '5px';

    profilePic.src = ' ';
    profilePic.alt = '';
    profilePic.title = '';
    userBio.textContent = '';
    follower.textContent = '';
    following.textContent = '';
};

// Function to perform the search
const performSearch = () => {
    let searchValue = userName.value.trim();
    if (!searchValue) {
        resetProfile('Please enter a username')

    } else {
        const requestUrl = `https://api.github.com/users/${searchValue}`;
        fetch(requestUrl)
            .then((response) => {
                if (!response.ok) {
                    // Check if the status code is 404, then throw "Not Found" error
                    if (response.status === 404) {
                        throw new Error("Not Found");
                    } else {
                        // For any other status, throw a "Failed to fetch" error
                        throw new Error("Failed to fetch");
                    }
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                updateProfile(data)
            })
            .catch((error) => {
                console.log(error);

                if (error.message === "Failed to fetch" || error.message === "TypeError: Failed to fetch") {

                    resetProfile('Please check your internet connection!')
                } else {
                    resetProfile('An error occurred!')
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

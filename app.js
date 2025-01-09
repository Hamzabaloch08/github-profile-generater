const userName = document.querySelector('#searchBox');
const searchButton = document.querySelector('#searchButton');
const profilePic = document.querySelector('.userProfilePic > img');
const userBio = document.querySelector('.userBio > p');
const profileCard = document.querySelector('.userGithubProfileCard');
const errorMsg = document.querySelector('#heading');
const follower = document.querySelector('.userFollower');
const following = document.querySelector('.userFollowing');
const loader = document.querySelector('#loader');

// Function to start loading
let startLoading = () => {
    loader.classList.remove('hidden'); // Remove the hidden class
    loader.classList.add('flex'); // Add the flex class
    profilePic.classList.add('hidden')
};

// Function to stop loading
let stopLoading = () => {
    loader.classList.remove('flex'); // Remove the flex class
    loader.classList.add('hidden'); // Add the hidden class
    profilePic.classList.remove('hidden')
};


// Function to update profile details
const updateProfile = (data) => {
    profilePic.src = data.avatar_url;
    profilePic.alt = data.login;
    profilePic.title = data.login;

    userBio.textContent = data.bio || `Hi 👋🏻, I'm ${data.login}`;

    follower.textContent = `Followers: ${data.followers}`;
    following.textContent = `Following: ${data.following}`;

    errorMsg.textContent = '';
};

// Function to reset profile details on error
const resetProfile = (errorText) => {
    errorMsg.textContent = errorText;
    errorMsg.style.color = 'red'; // Apply error styling

    profilePic.src = '';
    profilePic.alt = '';
    profilePic.title = '';
    userBio.textContent = '';
    follower.textContent = '';
    following.textContent = '';
};

// Function to perform the search
const performSearch = () => {
    const searchValue = userName.value.trim();

    if (!searchValue) {
        resetProfile('Please enter a username!');
        return;
    }

    // Show loader
    startLoading();

    const requestUrl = `https://api.github.com/users/${searchValue}`;
    fetch(requestUrl)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 404) throw new Error('Not Found');
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then((data) => {
            updateProfile(data);
        })
        .catch((error) => {
            if (error.message === 'Not Found') {
                resetProfile('User not found!');
            } else if (error.message.includes('Failed to fetch')) {
                resetProfile('Please check your internet connection!');
            } else {
                resetProfile('An error occurred!');
            }
        })
        .finally(() => {
            // Hide loader
            stopLoading();
        });
};


// Search on button click
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
});

// Search on pressing Enter
userName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
    }
});

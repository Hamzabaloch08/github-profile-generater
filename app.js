const userName = document.querySelector('.searchBox > input');
const searchButton = document.querySelector('.searchBox > button');
const profilePic = document.querySelector('.userProfilePic > img');
const userBio = document.querySelector('.userBio > p');
const profileCard = document.querySelector('.userGithubProfileCard');

// Function to perform the search
const performSearch = () => {
    let searchValue = userName.value.trim();
    if (!searchValue) {
        alert('Please enter a username');
    } else {
        const requestUrl = `https://api.github.com/users/${searchValue}`;
        fetch(requestUrl)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                profilePic.setAttribute('src', data.avatar_url);
                profilePic.setAttribute('alt', `${searchValue}`);
                profilePic.setAttribute('title', `${searchValue}`);

                if (!data.bio) {
                    userBio.textContent = `Hi 👋🏻, I'm ${searchValue}`;
                } else {
                    userBio.textContent = data.bio;
                }
                profileCard.style.justifyContent = 'start';
                profileCard.style.paddingTop = '20px'
                profileCard.style.gap = '15px'
                document.querySelector('.userGithubProfileCard > h2').innerHTML = ''

            })
            .catch((error) => {
                console.error(error);
                if (error.message === "Failed to fetch" ||error.message === "TypeError: Failed to fetch") {
                    alert('Please check your internet connection');
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

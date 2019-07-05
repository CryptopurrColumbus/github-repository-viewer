let PAGE;

const getUserName = () => {
	let username = document.querySelector('#username').value;
	return username;
};

function resetPage() {
	PAGE = 1;
}

function getUserdata(page = PAGE) {
	let username = getUserName();

	fetch(`https://api.github.com/users/${username}/repos?page=${page}`)
		.then(function(response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(function(data) {
			handleSuccessfulGithubResponse(data);
		})
		.catch(function(err) {
			handleFailedGithubResponse(err);
		});
}

function handleSuccessfulGithubResponse(data) {
	clearContent();
	appendData(data);
	showAdditionalContent(data);
}

function handleFailedGithubResponse(err) {
	clearContent();
  let errorBox = document.querySelector('#errorBox');
	errorBox.innerHTML = err;
}

function showAdditionalContent(data) {
	let more = document.querySelector('#moreContent');

	if (data.length < 30) {
		more.innerHTML = `<h5>Showing <span class ="text-info"> ${
			data.length
		}</span> repositories. No more repositories are available.</h5>`;
	} else {
		more.innerHTML = `<h6>Showing <span class ="text-info">${
			data.length
		}</span> repositories. Click the next button to load more repositories 
    and the previous button to go back a page for the same user.</h6>`;
	}
}

function appendData(data) {
	let mainContainer = document.getElementById('output');
	let inputField = document.querySelector('#username');
	let a = `<h3>${inputField.value}'s Repositories</h3>`;

	for (var i = 0; i < data.length; i++) {
		let output = `<div class = "mb-4 p-2 card"> <h5 class="mb-4"> <i class="fab fa-github"></i> &nbsp; &nbsp;
    <a href=${data[i].html_url}> ${
      data[i].name}</a></h5> <h6> <i class="fas fa-eye" title="Watchers Count"></i> &nbsp; ${
			data[i].watchers
		} &nbsp; &nbsp; <i class="fas fa-star" title="Stargazers Count"></i> &nbsp; ${
			data[i].stargazers_count
		} &nbsp; &nbsp; <i class="fas fa-code-branch"title="Fork Count"></i> &nbsp; ${
			data[i].forks
    }</h6>
    <h6> Description: ${data[i].description}</h6>
    <h6> Language: ${data[i].language}</h6></div>`;
    
    a += output;
	}
	mainContainer.innerHTML = a;
}

function clearContent() {
	let mainContainer = document.getElementById('output');
	mainContainer.innerHTML = '';
	let errorBox = document.querySelector('#errorBox');
	errorBox.innerHTML = '';
	let moreContent = document.getElementById('moreContent');
	moreContent.innerHTML = '';
}

// Register the event handlers for next and previous button
let nextBtn = document.querySelector('#next');
nextBtn.addEventListener('click', increasePageNumber);

let previousButton = document.querySelector('#previous');
previousButton.addEventListener('click', decreasePageNumber);

// Event handlers for next and previous buttons
function increasePageNumber() {
	PAGE += 1;
	getUserdata();
}

function decreasePageNumber() {
	PAGE -= 1;
	getUserdata();
}


let PAGE = 1;

const getUserName = () => {
  let username = document.querySelector('#username').value;
  return username;
};

function getUserdata(page=PAGE) {
  var username = getUserName();
  fetch(`https://api.github.com/users/${username}/repos?page=${page}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // let _shouldAddNextButton = shouldAddNextButton(response);
			// return Promise.all([response.json(), _shouldAddNextButton]);
			return response.json()
    })
    .then(function(data) {
			handleSuccessfulGithubResponse(data)
    })
    .catch(function(err) {
			handleFailedGithubResponse(err)
    });
}

function handleSuccessfulGithubResponse(data) {
		clearContent();
		appendData(data);
		showButtons(data);
}

function handleFailedGithubResponse(err) {
		clearContent();
		let errorBox = document.querySelector('#errorBox');
		errorBox.innerHTML = err;
}

function showButtons(data) {
	let more = document.querySelector('#moreContent');
	if (PAGE > 1) {
		// show the previous button
		// document.getElementById("previous").style.display = 'inline';
		console.log(document.getElementById("previous"))
	}
  if (data.length < 30) {
    more.innerHTML = `<h5>Showing <span class ="text-info"> ${
      data.length
    }</span> repositories. No more repositories are available.</h5>`;
  } else {
    more.innerHTML = `<h5>Showing <span class ="text-info">${
      data.length
		}</span> repositories. Click the next button to load more repositories.</h5>`;
		// show the next button
		console.log(document.getElementById("next"));
		// document.getElementById("next").style.display = 'inline';
  }
}


function appendData(data) {
  var mainContainer = document.getElementById('output');
  var inputField = document.querySelector('#username');
  let a = `<h3>${inputField.value}'s Repositories</h3>`;

  for (var i = 0; i < data.length; i++) { 
    let output = `<div class = "mb-4 p-2  card"><h5 class="mb-4"><i class="fab fa-github"></i>&nbsp;&nbsp;&nbsp;<a  href=${data[i].html_url} >${
      data[i].name
    }</a></h5> <h6> <i class="fas fa-eye"></i>Watched : ${
      data[i].watchers
    } &nbsp; &nbsp;   <i class="fas fa-star"></i>Starred : ${data[i].stargazers_count} &nbsp; &nbsp;   <i class="fas fa-code-branch"></i> Forked: ${
      data[i].forks
    }</h6><h6> Description: ${data[i].description}</h6>
   
    <h6> Language: ${data[i].language}</h6>  </div>`;
    a += output;
  }
  mainContainer.innerHTML = a;
}

function clearContent() {
  var mainContainer = document.getElementById('output');
  mainContainer.innerHTML = '';
  let errorBox = document.querySelector('#errorBox');
  errorBox.innerHTML = '';
}

// function shouldAddNextButton(response) {
//   let z = response.headers.get('Link');
//   if (typeof z === 'string') {
//     let fs = z.indexOf('<');
//     let fe = z.indexOf('>');
//     let ss = z.lastIndexOf('<');
//     let pe = z.lastIndexOf('>');
//     let start = z.slice(fs + 1, fe);
//     let end = z.slice(ss + 1, pe);
//     return [start === end];
//   }
// }


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

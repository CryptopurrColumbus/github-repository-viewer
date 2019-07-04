const putUsernameInReq = () => {
	let username = document.querySelector('#username').value;
	return username;
};

function getUserdata() {
	fetch( `https://api.github.com/users/${putUsernameInReq()}/repos `)
		.then(function(response) {
      console.log(response.headers);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			clearContent();
			appendData(data);
		})
		.catch(function(err) {
			clearContent();
			let errorBox = document.querySelector('#errorBox');
			errorBox.innerHTML = err;
    });
    
	function appendData(data) {
		var mainContainer = document.getElementById('output');
		var inputField = document.querySelector('#username');
		let a = `<h1>${inputField.value}: User Repositories</h1>`;
		console.log(a);

		for (var i = 0; i < data.length; i++) {
			let output = `<h1><a href=${data[i].html_url} >${
				data[i].name
			}</a></h1> <h2> Description:${data[i].description}</h2><h3> Is a fork : ${
				data[i].fork
			} </h3> <h4> Language: ${data[i].language} <p> Watched : ${
				data[i].watchers
			}<p> <p> Starred : ${data[i].stargazers_count}<p> <p>Forked : ${
				data[i].forks
			}<p>`;
			console.log(output);

			a += output;
			console.log(a);
		}
		mainContainer.innerHTML = a;
	}
}
function clearContent() {
	var mainContainer = document.getElementById('output');
	mainContainer.innerHTML = '';
	let errorBox = document.querySelector('#errorBox');
	errorBox.innerHTML = '';
}

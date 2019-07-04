const getUserName = () => {
	let username = document.querySelector('#username').value;
	return username;
};

function getUserdata() {
	var username = getUserName();
	fetch(`https://api.github.com/users/${username}/repos`)
		.then(function(response) {
      // console.log( response.headers.get('Link'));
      if (!response.ok) {
				throw Error(response.statusText);
			}
      let a = nextreq(response);
      console.log(a);
		  return Promise.all([response.json(),a]);
		})
		.then(function([data,a]) {
      clearContent();
      console.log(a);
			appendData(data);
		   moreM(data,a);
			
		})
		.catch(function(err) {
			clearContent();
			let errorBox = document.querySelector('#errorBox');
			errorBox.innerHTML = err;
		});
}


function moreM(data,a) {
	let more = document.querySelector('#moreContent');
	console.log(data);
	if (data.length < 30) {
		console.log('hi');
		more.innerHTML = `<h2>Showing ${
			data.length
		} repositories. No more repositories are available</h2>`;
	} else {
		console.log('heya');
		more.innerHTML = `<h2>Showing ${
			data.length
    } repositories.Click next button to load more repositories</h2> <button type="submit" id="prev">Prev</button> <button type="submit" id="next">Next</button>`
    ;
    request(a)
	}
}

function addRepoInfoHTML(data) {
  var mainContainer = document.getElementById('output');
  var inputField = document.querySelector('#username');
  let a = `<h1>${inputField.value}: User Repositories</h1>`;

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

function nextreq(response) {
	console.log(response);
  let z = response.headers.get('Link');
  if (typeof(z) === 'string'){
	console.log(z);
	let fs = z.indexOf('<');
	let fe = z.indexOf('>');
	let ss = z.lastIndexOf('<');
	let pe = z.lastIndexOf('>');
	console.log(fs + 1, fe - 1, ss + 1, pe - 1);
	let start = z.slice(fs + 1, fe);
	let end = z.slice(ss + 1, pe);
	console.log('start:',start);
  console.log('end:',end);
  console.log(start === end);
  return [(start === end)];
	
}}

function request() {
    let nextBtn = document.querySelector('#next');
    nextBtn.addEventListener('click', clickBTn());
 }
function clickBtn(
  // click  next button to produce next list of repositories
)

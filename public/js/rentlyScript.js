const url = window.location.href;

// OPEN CATEGORY

catDivs = document.querySelectorAll('.category');

catDivs.forEach(function(catDiv) {
  catDiv.addEventListener('click', function(ev) {
    var element = ev.target;
    while (element.className != 'cat-container') {
      element = element.parentElement;
    }

    var categoryDetails = element.querySelector('.category-details');
    // var fa = element.parentElement.querySelector('.fa-caret-right');
    // console.log(fa.classList); // use methods

    if (categoryDetails.style.display == 'none') {
      categoryDetails.style.display = 'block';
      // fa.classList.remove = 'fa-caret-right';
    } else {
      categoryDetails.style.display = 'none';
      // fa.classList = 'fa-caret-right';
    }
  });
});


// OPEN ENDPOINT LINES   //AND ADD PLAYGROUND HTML

var endpointLines = document.querySelectorAll('.endpoint-line');

endpointLines.forEach(function(line) {
  line.addEventListener('click', function(ev) {
    var element = ev.target;

    while (element.className != 'endpoint-block') {
      element = element.parentElement;
    }

    var playgroundDiv = element.querySelector('.endpoint-playground');

    if (playgroundDiv.style.display == 'none') {
      playgroundDiv.style.display = 'block';
    } else {
      playgroundDiv.style.display = 'none';
    }
  });
});


// TEST LOGIN BUTTON: POST users/login AND STORE TOKEN (in memory)

var token;
var testLoginBtn = document.getElementById('test-login-btn');
var resPara = document.getElementById('res-test-login');

testLoginBtn.addEventListener('click', function(ev) {
  var url = 'http://localhost:3000/api/auth';
  var data = {email: 'webinttest@test.com', password: '123456'}
  var options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
  fetch(url, options).then(function(response) {
    // token = response.headers.get('x-auth-token'); // if token was in the header. BUT IT IS IN THE BODY
    // qua cera il resPara
    if (response.status == 200) {
      testLoginBtn.innerHTML = "Logged in as test user";
      testLoginBtn.style.backgroundColor = 'green';
    }
    return response.text();
  }).then(function(responseText) {
    token = responseText;
  }).catch((err) => {
    console.log('There was an error during login. Please try again.')
    testLoginBtn.innerHTML = "Error. Please try again.";
    testLoginBtn.style.backgroundColor = 'orange';
    resPara.innerHTML = response.status + ' ' + response.statusText;
  });

});


// Add event listener to makecall button

var executeBtns = document.querySelectorAll('.execute-btn');
// console.log(executeBtns[5]);

executeBtns.forEach(function(button, i, buttons) {
  button.addEventListener('click', function(ev) {
    switch (i) {
      // genres
      case 0:
        button.parentElement.querySelector('.res-window').innerHTML = 'Waiting for response...';
        apiReq('api/genres', 'GET', null, button);
        break;
      case 1:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]'); //QUA DEVO ESTRARRE IL TEXT DALL?INPUT!! E SE CI SONO PIU INPUT??????!!
        apiReq('api/genres', 'POST', {name: valueInput.value}, button);
        break;
      case 2:
        var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
        apiReq(`api/genres/${valueInputs[0].value}`, 'PUT', {name: valueInputs[1].value}, button);
        break;
      case 3:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]');
        apiReq(`api/genres/${valueInput.value}`, 'DELETE', null, button);
        break;
      // case 4:
      //   var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
      //   apiReq(`todos/${valueInputs[0].value}`, 'PATCH', {text: valueInputs[1].value, completed: valueInputs[2].checked}, button);
      //   break;
      case 4:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]');
        apiReq(`api/genres/${valueInput.value}`, 'GET', null, button);
        break;
      // movies
      case 5:
        // var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
        apiReq('api/movies', 'GET', null, button);
        break;
      case 6:
        var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
        apiReq('api/movies', 'POST', {title: valueInputs[0].value, genreId: valueInputs[1].value, numberInStock: valueInputs[2].value, dailyRentalRate: valueInputs[3].value}, button);
        break;
      case 7:
        var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
        console.log(valueInputs);
        apiReq(`api/movies/${valueInputs[0].value}`, 'PUT', {title: valueInputs[1].value, genreId: valueInputs[2].value, numberInStock: valueInputs[3].value, dailyRentalRate: valueInputs[4].value}, button);
        break;
      case 8:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]');
        apiReq(`api/movies/${valueInput.value}`, 'DELETE', null, button);
        break;
      case 9:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]');
        apiReq(`api/movies/${valueInput.value}`, 'GET', null, button);
        break;
      // customers
      case 10:
        apiReq('api/customers', 'GET', null, button);
        break;
      case 11:
        var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
        apiReq('api/customers', 'POST', {name: valueInputs[0].value, isGold: valueInputs[1].value, phone: valueInputs[2].value}, button);
        break;
      case 12:
        var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
        apiReq(`api/customers/${valueInputs[0].value}`, 'PUT', {name: valueInputs[1].value, isGold: valueInputs[2].value, phone: valueInputs[3].value}, button);
        break;
      case 13:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]');
        apiReq(`api/customers/${valueInput.value}`, 'DELETE', null, button);
        break;
      case 14:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]');
        apiReq(`api/customers/${valueInput.value}`, 'GET', null, button);
        break;
      // rentals
      case 15:
        apiReq('api/rentals', 'GET', null, button);
        break;
      case 16:
        var valueInputs = button.parentElement.querySelectorAll('input[name="valueInput"]');
        apiReq('api/rentals/', 'POST', {customerId: valueInputs[0].value, movieId: valueInputs[1].value}, button);
        break;
      case 17:
        var valueInput = button.parentElement.querySelector('input[name="valueInput"]');
        apiReq(`api/rentals/${valueInput.value}`, 'GET', null, button);
        break;
    }
  });
});

function apiReq(path, method, body, currentButton) {
  console.log('INSIDE apiReq');
  var currentUrl = url + path;
  var options = Object.create(null);
  options.method = method;
  options.headers = {'Content-Type': 'application/json'};
  if (token) {
    options.headers['x-auth-token'] = token;
  }
  if (body != null) {
    options.body = JSON.stringify(body);
  }
  console.log('OPTIONS TO BE PASSED', options);
  console.log(currentUrl)

  fetch(currentUrl, options).then(function(response) {
    var statusWindow = currentButton.parentElement.querySelector('.status-window');
    statusWindow.innerHTML = response.status + ' ' + response.statusText;

    if (response.status != 200) {
      return response.statusText;
    }
    if (path == 'api/auth' && response.status == 200) {
      token = response.headers.get('x-auth-token');
      testLoginBtn.innerHTML = 'Now logged in as ' + body.email;
      return 'You are now logged in as ' + body.email;
    }
    if (path == 'users/me/token' && response.status == 200) {
      testLoginBtn.innerHTML = "Log in as a test user";
      testLoginBtn.style.backgroundColor = '#0069ed';
      return 'You have been logged out';
    }

    return response.json();
  }).then(function(resData) {
    console.log('RESDATA', resData);
    var resWindow = currentButton.parentElement.querySelector('.res-window');
    resWindow.innerHTML = JSON.stringify(resData, null, 4);
  });
}

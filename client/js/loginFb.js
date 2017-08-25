axios.defaults.baseURL = 'http://localhost:3000/signin';

window.fbAsyncInit = function() {
FB.init({
  appId      : '468598230165701',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
});

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  // console.log('masuk sdk facebokk');
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    let token = response.authResponse.accessToken
    localStorage.setItem('fbtoken', token)
    console.log(`response in`);
  } else {
    console.log(`please login first`);
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function fbLogin() {
  FB.login(function(response) {
    // console.log(response);
    var tokenFb = response.authResponse.accessToken
    console.log(tokenFb);
    if(response.authResponse) {
      FB.api('/me', {fields: 'id, name, first_name, email'}, function(response){
        var id = response.id;
        var name = response.name;
        var first_name = response.first_name;
        var email = response.email;
        console.log(response.id);
        console.log(response.name);
        console.log(response.first_name);
        console.log(response.email);
        console.log(tokenFb);
        axios.post('http://localhost:3000/signin', {

        }, {
          headers: {
            accesstoken: tokenFb,
            id: id,
            name: name,
            first_name: first_name,
            email: email
          }
        })
        .then(response => {
          console.log('ini response.data dari then',response.data);
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('email', response.data.email)
          // window.location = 'home.html'
          console.log('Apa ajah, ' + response.name + '.');
        })
        .catch(err => {
          console.log(err);
        })
      })
    } else {
      console.log('User Canceled');
    }
  }, {
    scope: 'public_profile,email'
  });
}

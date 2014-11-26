angular.module('starter.services', [])

.factory('Settings', function() {

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var settingConfig = [
    { id: 0, name: 'Facebook', com:'com.facebook.katana',allow: false, installed: true, icon: 'ion-social-facebook'},
    { id: 1, name: 'Twitter', com:'com.twitter.android',allow: false, installed: true, icon: 'ion-social-twitter' },
    { id: 2, name: 'WhatsApp',com:'com.whatsapp',allow: false, installed: true, icon: 'ion-android-chat' },
    { id: 3, name: 'Instagram', com:'com.app.instagram',allow: false, installed: false, icon: 'ion-social-instagram' },
    { id: 4, name: 'Youtube', com:'com.app.youtube',allow: false, installed: false, icon:'ion-social-youtube'},
    { id: 5, name: 'Linkedin', com:'com.app.linkedin',allow: false, installed: false, icon: 'ion-social-linkedin'},
    { id: 6, name: 'Google+',com:'com.app.googleplus',allow: false, installed: false, icon: 'ion-social-googleplus' },
    { id: 7, name: 'Reddit', com:'com.app.reddit',allow: false, installed: false, icon: 'ion-social-reddit' }
  ];

  return {
    all: function() {
      return settingConfig;
    },
    get: function(appId) {
      // Simple index lookup
      return settingConfig[appId];
    },
	updateAppInstalled: function(appId){
		console.log('Settings - updating app installed:' + appId); 
		/*$cordovaAppAvailability
		.check(settingConfig[appId].id)
		.then(function(success) {
		  settingConfig[appId].allow = true;
		  return true;
		},
		function (error) {
		  settingConfig[appId].allow = false;
		  return false;
		});	
		*/
	}
  }
})

.factory('User', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  //var userName = 'My Name';
  var user = 
    { userName: '', firstName:'',lastName: '', email: '', password: '', retypePassword:'',signedIn: false};

  return {
	getUser: function(){
		return user;
	},
	reset: function(){
		user.userName = '';
		user.firstName = '';
		user.lastName = '';
		user.email = '';
		user.password = '';
		user.retypePassword = '';
		user.signedIn = false;
	}
  }
})


// Socket service to connect to the server
.factory('SocketIO', function() {
	var SOCKET_URL = 'localhost:8000';
	var socket=io(SOCKET_URL);
	
	return {
	getSocket: function(){
		return socket;
	}
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});

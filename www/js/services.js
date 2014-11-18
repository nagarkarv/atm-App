angular.module('starter.services', [])

.factory('Settings', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var settingConfig = [
    { id: 0, name: 'Facebook', com:'com.facebook.katana',allow: true, icon: 'ion-social-facebook'},
    { id: 1, name: 'Twitter', com:'com.twitter.android',allow: true, icon: 'ion-social-twitter' },
    { id: 2, name: 'WhatsApp',com:'com.whatsapp',allow: true, icon: 'ion-android-chat' },
    { id: 3, name: 'Instagram', com:'com.app.instagram',allow: true, icon: 'ion-social-instagram' },
    { id: 4, name: 'Youtube', com:'com.app.youtube',allow: true, icon: 'ion-social-youtube'},
    { id: 5, name: 'Linkedin', com:'com.app.linkedin',allow: true, icon: 'ion-social-linkedin'},
    { id: 6, name: 'Google+',com:'com.app.googleplus',allow: true, icon: 'ion-social-googleplus' },
    { id: 7, name: 'Reddit', com:'com.app.reddit',allow: true, icon: 'ion-social-reddit' }
  ];

  return {
    all: function() {
      return settingConfig;
    },
    get: function(appId) {
      // Simple index lookup
      return settingConfig[appId];
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

angular.module('starter.controllers', ['ngCordova'])
//angular.module('starter.controllers', [])

.controller('SignUpCtrl', function($scope, $state, $rootScope, SocketIO, User) {

	$scope.signUp = function(userInfo){
		var socket = SocketIO.getSocket();
		console.log('Socket = '+socket);
	
		// Sign up
		socket.emit('atm:signup',userInfo);
		socket.on ('atm:signup'+'SUCCESS', function (userInfo) {
			console.log('@@@Success received: Signed in:'+userInfo.userName);
			$state.go('tab.atmlive');
			$rootScope.userInfo = userInfo;
		});

		// get user settings
		console.log('Emit GetSettings for:'+userInfo.userName);
		socket.emit('atm:getSettings',$rootScope.userInfo);
		socket.on ('atm:getSettings'+'SUCCESS', function (settings) {
			console.log('getSettings Success:'+userInfo.userName);
			$rootScope.userInfo.settings = settings;
		});
		
		socket.on ('atm:signup'+'ERROR', function (userInfo) {
			console.log('@@@Error in signing user:'+userInfo.userName);
			$rootScope.userInfo = userInfo;
		});
	};
	
	$scope.login = function(){
		var socket = SocketIO.getSocket();
		socket.emit('atm:login',$rootScope.userInfo);
		socket.on ('atm:login'+'SUCCESS', function (data) {
			console.log('@@@Success received: Logged in:'+userInfo.userName);
			$state.go('tab.atmlive');
			$rootScope.userInfo.signedIn = true;
		});
	};

	// at $rootScope so can be called from throughout the application.
	$rootScope.logout = function(){
		var socket = SocketIO.getSocket();
		socket.emit('atm:logout',$rootScope.userInfo);
		socket.on ('atm:logout'+'SUCCESS', function (userInfo) {
			console.log('@@@Success received: User Logged out:'+userInfo.userName);
			User.reset();
			$rootScope.userInfo = User.getUser();
			$state.go('tab.signup');
		});
	};
	
	$scope.fakeData = function(){
		$rootScope.userInfo.firstName = faker.name.firstName(); 
		$rootScope.userInfo.email = faker.internet.email(); 
		$rootScope.userInfo.lastName = faker.name.lastName();
		$rootScope.userInfo.userName = $rootScope.userInfo.firstName + '.' + $rootScope.userInfo.lastName;
		$rootScope.userInfo.password = 'passw0rd';
		$rootScope.userInfo.retypePassword = 'passw0rd';
		console.log('Fake Data generated');
	}
	})

.controller('ATMLiveCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope,Settings, $rootScope, $ionicPlatform) {
//.controller('SettingsCtrl', function($scope,Settings, $rootScope, $cordovaAppAvailability,$ionicPlatform) {

	$scope.IsAppAvailiable = function(appId){
				$cordovaAppAvailability
				.check($rootScope.userInfo.settings[appId].com)
				.then(function(success) {
				  $rootScope.userInfo.settings[appId].installed = true;
				  $scope.text = 'checked, return true:'+appId;
				  return true;
				},
				function (error) {
				  $rootScope.userInfo.settings[appId].installed = false;
				  $scope.text = 'checked, return false:' + appId;
				  return false;
				});	    
	}
	
	$ionicPlatform.ready(function() {
			//If platform is ready, check app availability and set accordingly
			for(i = 0;i < $rootScope.userInfo.settings.length;i++)
			{
				console.log('checking for: '+$rootScope.userInfo.settings[i].com);
				//var ret = $scope.IsAppAvailiable(i);
				//console.log('Device Ready - SettingsCtrl loaded, Return = '+ret); 	
			}
	});	
	$scope.confirmSetting = function(){
	};

	$scope.isAppInstalled = function(appId){
		$cordovaAppAvailability
		.check(settingsConfig[appId].id)
		.then(function(success) {
		  settingsConfig[appId].allow = true;
		  return true;
		},
		function (error) {
		  settingsConfig[appId].allow = false;
		  return false;
		});	
	};
 })

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});

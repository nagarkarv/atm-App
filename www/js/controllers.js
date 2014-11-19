angular.module('starter.controllers', ['ngCordova'])
//angular.module('starter.controllers', [])

.controller('SignUpCtrl', function($scope, User, $state, $rootScope) {
	
	$scope.signUp = function(userInfo){
		console.log('Signed in:'+userInfo.userName);
		$state.go('tab.atmlive');
		$rootScope.userInfo.signedIn = true;
	};
	
	$scope.login = function(){
		$rootScope.userInfo.signedIn = true;
		$state.go('tab.atmlive');
	};

	// at $rootScope so can be called from throughout the application.
	$rootScope.logout = function(){
		User.reset();
		$state.go('tab.signup');
		console.log('SignUpCtrl: Logout'); // 'Data to send'
	};
	})

.controller('ATMLiveCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope,Settings, $cordovaAppAvailability) {
//.controller('SettingsCtrl', function($scope,Settings) {
	$scope.settingsConfig = Settings.all();
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

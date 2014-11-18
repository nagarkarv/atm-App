angular.module('starter.controllers', ['ngCordova'])
//angular.module('starter.controllers', [])

.controller('SignUpCtrl', function($scope, User, $state, $rootScope) {
	//$scope.UserInfo = User.all();
	$scope.userInfo = User.getUser();
	
	$scope.signUp = function(userInfo){
	// TODO
	console.log('Signed in:'+userInfo.userName);
	$state.go('tab.atmlive');
	$scope.userInfo.signedIn = true;
	$rootScope.loggedIn = $scope.userInfo.signedIn;
	};
	
	$scope.login = function(){
	// TODO
		//$urlRouterProvider.otherwise('/tab/atmlive');
		$scope.userInfo.signedIn = true;
		$rootScope.loggedIn = $scope.userInfo.signedIn;
		$state.go('tab.atmlive');
	};
	
	$rootScope.$on('logout', function (event, data) {
		console.log('SignUpCtrl'+data); // 'Data to send'
		User.reset();
		$rootScope.loggedIn = false;
		$state.go('tab.signup');
		});	
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

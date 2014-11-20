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

.controller('SettingsCtrl', function($scope,Settings, $cordovaAppAvailability,$ionicPlatform) {
//.controller('SettingsCtrl', function($scope,Settings) {
	$scope.settingsConfig = Settings.all();

	$scope.IsAppAvailiable = function(appId){
				$cordovaAppAvailability
				.check($scope.settingsConfig[appId].com)
				.then(function(success) {
				  $scope.settingsConfig[appId].installed = true;
				  $scope.text = 'checked, return true:'+appId;
				  return true;
				},
				function (error) {
				  $scope.settingsConfig[appId].installed = false;
				  $scope.text = 'checked, return false:' + appId;
				  return false;
				});	    
	}
	
	$ionicPlatform.ready(function() {
		//$cordovaPlugin.someFunction().then(success, error);
			var appId = 0;
			console.log('Device Ready - SettingsCtrl loaded --- '); 
			console.log('Device Ready - SettingsCtrl loaded ***' + $scope.settingsConfig[appId].com); 
			$scope.text = 'checking apps for ' + $scope.settingsConfig[appId].com;
			for(i = 0;i < $scope.settingsConfig.length;i++)
			{
				//console.log('checking for: '+$scope.settingsConfig[i].com); 	
				/*$cordovaAppAvailability
				.check($scope.settingsConfig[i].com)
				.then(function(success) {
				  $scope.settingsConfig[i].installed = true;
				  $scope.text = 'checked, return true';
				  //return true;
				},
				function (error) {
				  $scope.settingsConfig[i].installed = false;
				  $scope.text = 'checked, return false';
				  //return false;
				});	    
				*/
				console.log('checking for: '+$scope.settingsConfig[i].com);
				var ret = $scope.IsAppAvailiable(i);
				//$scope.settingsConfig[i].installed = ret;
				console.log('Device Ready - SettingsCtrl loaded, Return = '+ret); 	
			}
	});	
	/*ionic.Platform.ready(function(){  
			console.log('Device Ready - SettingsCtrl loaded'); 
			var appId = 0;
			$cordovaAppAvailability
			.check($scope.settingsConfig[appId].com)
			.then(function(success) {
			  $scope.settingsConfig[appId].allow = true;
			  return true;
			},
			function (error) {
			  $scope.settingsConfig[appId].allow = false;
			  return false;
			});	    
		});	
	*/
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

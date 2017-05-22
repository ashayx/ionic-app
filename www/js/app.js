
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.directives','ionic-citypicker'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	    	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    	cordova.plugins.Keyboard.disableScroll(true);

	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	  	}
	});
})
.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
//android tabs在底部
.config(function($ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.swipeBackEnabled(true);
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
  	url: '/tab',
  	abstract: true,
  	templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
  	url: '/home',
  	views: {
  		'tab-home': {
  			templateUrl: 'templates/tab-home.html',
  			controller: 'HomeCtrl'
  		}
  	}
  })
  .state('tab.food-detail', {
  	url: '/home/food/{id}',
  	views: {
  		'tab-home': {
  			templateUrl: 'templates/food-detail.html',
  			controller: 'FoodDetailCtrl'
  		}
  	}
  })

  .state('tab.nearby', {
  	url: '/nearby',
  	views: {
  		'tab-nearby': {
  			templateUrl: 'templates/tab-nearby.html',
  			controller: 'NearbyCtrl'
  		}
  	}
  })
  .state('tab.nearby-detail', {
  	url: '/nearby/{id}',
  	views: {
  		'tab-nearby': {
  			templateUrl: 'templates/nearby-detail.html',
  			controller: 'NearbyDetailCtrl'
  		}
  	}
  })

  .state('tab.order', {
  	url: '/order',
  	views: {
  		'tab-order': {
  			templateUrl: 'templates/tab-order.html',
  			controller: 'OrderCtrl'
  		}
  	}
  })

  .state('tab.mine',{
  	url:'/mine',
  	views:{
  		'tab-mine':{
  			templateUrl:'templates/tab-mine.html',
  			controller:'MineCtrl'
  		}
  	}
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})



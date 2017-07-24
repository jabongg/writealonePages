

	// create the module and name it scotchApp
	var scotchApp = angular.module('writealoneApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/wa_home.html',
				controller  : 'homeController'
			})

 			// route for the about page
			.when('/login', {
				templateUrl : 'views/login.html',
				controller  : 'loginController'
			})

			// route for the contact page
			.when('/signup', {
				templateUrl : 'views/signup.html',
				controller  : 'signupController'
			})
			// otherwise redirect to home page
			.otherwise({
				redirectTo : '/'
		}); 
	});
	
	
		// create the controller and inject Angular's $scope
	scotchApp.controller('homeController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

 	scotchApp.controller('loginController', function($scope) {
		$scope.message = 'Look! I am an login page.';
	});

	scotchApp.controller('signupController', function($scope) {
		$scope.message = 'signup .This is just a demo.';
	}); 
	
	

/* // defining module and app

(function () {
	angular.module('writealoneApp', ['ngRoute'])
	
	// configure routes
		.config(function($routeProvider) {
			// route for the home page
			.when('/', {
				templateUrl	:	'views/wa_home.html',
				controller	:	'HomeController'
			})	
		})
		.controller('homeController', HomeController);
	
	HomeController.$inject = ['$scope'];
	function HomeController($scope) {
			// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	}
})();
  */
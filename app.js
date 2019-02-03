var myapp = angular.module('myapp',['ngRoute','controller'])
myapp.config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{		
	templateUrl:'ln.html',
	controller:'lndata'
	})
	.otherwise({
		redirectTo:'/'
	});
});

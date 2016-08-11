var app = angular.module('redditClone.controllers', [])

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
	$http.get('https://www.reddit.com/r/webdev/top/.json?limit=50').then(function(data) {
		console.log(data.data.data);
	})
	console.log('aayyyo sayn its cha boi ');

}])

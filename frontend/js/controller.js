var app = angular.module('redditClone.controllers', [])

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
  $scope.subreddit = {};
  $scope.subreddit.title;
  $scope.subreddit.imageURL;
  $scope.subreddit.brief;
	$http.get('https://www.reddit.com/r/webdev/top/.json?limit=50').then(function(data) {
		console.log(data.data.data);
	})

}])

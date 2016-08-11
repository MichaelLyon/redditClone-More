var app = angular.module('redditClone.controllers', [])

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
  var redditSubs = this
  $scope.subredditObj = {};
  $scope.sumbitPostShowFormBool = false;

  $scope.getPosts = function(subName){
    $http.get(`https://www.reddit.com/r/${subName}/top/.json?limit=50`).then(function(data) {
      $scope.subredditObj.posts = data.data.data.children;
      console.log($scope.subredditObj.posts);
  	})
  }
    getSubs = function () {
    $http.get('https://www.reddit.com/reddits.json?limit=50&after=t3_10omtd/').then(function(data) {
      $scope.subredditObj.subs = data.data.data.children

  	})
  }
  $scope.showSubmitForm = function () {
    $scope.sumbitPostShowFormBool = true;
  }
  $scope.submit =function (post) {
    $scope.sumbitPostShowFormBool = false;
    console.log(post);
  }

getSubs();
}])

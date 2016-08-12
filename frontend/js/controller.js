var app = angular.module('redditClone.controllers', [])

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
	var redditSubs = this
	$scope.subredditObj = {};
	$scope.sumbitPostShowFormBool = false;
	$scope.timeStamp = new Date(new Date().getTime()).toString();
	$scope.upVoteBool = false;
	$scope.downVoteBool = false;
  $scope.commentBool = false;

	var todaysDayString = $scope.timeStamp.slice(0, 3);

	$scope.upVoteCheck = function(post) {
    post.data.ups += 1;
    post.data.downVote = false;
		post.data.upVote = !post.data.upVote;
	}
	$scope.downVoteCheck = function(post) {
    post.data.ups -= 1;
    post.data.upVote = false;
		post.data.downVote = !post.data.downVote;
	}
	$scope.trimString = function(str) {
		return str.replace(/\s/g, '');
	}
	$scope.getPosts = function(subName) {
		$http.get(`https://www.reddit.com/r/${subName}/top/.json?limit=50`).then(function(data) {
			$scope.subredditObj.posts = data.data.data.children;
			$scope.subredditObj.posts.forEach(function(post) {
				post.data.upVote = false;
				post.data.downVote = false;
			})
			console.log($scope.subredditObj.posts);
		})
	}
	getSubs = function() {
		$http.get('https://www.reddit.com/reddits.json?limit=50&after=t3_10omtd/').then(function(data) {
			$scope.subredditObj.subs = data.data.data.children
		})
	}
	$scope.showSubmitForm = function() {
		$scope.sumbitPostShowFormBool = true;
	}
	$scope.submit = function(post) {
    $scope.sumbitPostShowFormBool = false;
    $scope.commentObj = {};
    $scope.commentObj.data = {};
    $scope.commentObj.data.author = post.author;
    $scope.commentObj.data.title = post.title;
    $scope.commentObj.data.thumbnail = post.imageUrl;
    $scope.commentObj.data.description = post.description;
    $scope.commentObj.data.ups =0;
    $scope.commentObj.data.upVote = false;
    $scope.commentObj.data.downVote = false;
    $scope.subredditObj.posts.push($scope.commentObj);
	}

	$scope.getTime = function(mili) {
		var dateObject = new Date(mili * 1000);
		var time = dateObject.toLocaleTimeString();
		var day = checkDay(dateObject.toString().slice(0, 3));
		var returnDate = (day + ' at ' + time)
		return returnDate;
	}

	checkDay = function(dayString) {
		var dayArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		if (todaysDayString === dayString) {
			return 'Today'
		} else if (dayArray.indexOf(dayString) !== dayArray.indexOf(todaysDayString)) {
			if (dayArray.indexOf(dayString) === dayArray.indexOf(todaysDayString) - 1) {
				return 'Yesterday'
			} else {
				return 'Last ' + dayString
			}
		}
	}

	getSubs();
}])

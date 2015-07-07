var $ = require('jquery');
var angular = require('angular');

var app = angular.module('chatApp', []);
app.controller('chatCtrl', ['$scope', 'dataService', function($scope, dataService){
	$scope.lastMessage;
	$scope.messages;
	$scope.newMessage;

	getRecentMessages();

	function getRecentMessages(){
		dataService.getRecentMessages().then(function(result){	
			$scope.messageCount = result.data.messageCount;
			$scope.lastMessage = result.data.lastMessage;
			$scope.messages = result.data.messages;
		});
	}

	$scope.postMessage = function (){
		dataService.postMessage($scope.newMessage).then(function(data){
			$scope.newMessage = '';
			getRecentMessages();
		});	
	}
}]);

app.factory('dataService', ['$http', function($http){
	var urlBase = 'http://192.168.59.103:8080/messages';

	var getRecentMessages = function (){
		return $http.get(urlBase + "/recent");
	};

	var postMessage = function(content){
		return $http.post(urlBase + "/names/" + content);
	};

 	return{
        getRecentMessages: getRecentMessages,
        postMessage: postMessage
    };
	

}]);

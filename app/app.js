var angular = require('angular');
var app = angular.module('sourceDemo', []);

app.controller('MainController', function($scope, $http){

	$scope.newURL = "";
	$scope.list = [];
	var url = "http://localhost:3000/url";

	$scope.onSubmit = function(){
		console.log("Posting");
		
		var data = {"url" : $scope.newURL};
		
		$http.post(url, data).then(
			function successCallback(response){
				$scope.newURL = "";
				$scope.list.push(response.data.url);
			},
			function errorCallback(response){
				alert("Error!");
			}
		); //send the URL for processing;

	}

	/*------- INIT ------*/
	$http.get(url).then(
		function successCallback(response){
			var originalList = $scope.list;
			$scope.list = originalList.concat(response.data.list);
		}, 
		function errorCallback(response){
			alert("Error!");
		});
	
});

/**
 * Food Locator Application - Questions Controller.
 * Builds URL and redirects user.
 * @author Joshua R. Thomas
 * @version 2.2
 */
Locator.controller('HdgController',['$scope','$timeout','$http','Languages', function($scope, $timeout, $http, Languages) {
	
	// Questions
	$scope.step = 1;
	$scope.ability = 0;
	$scope.adult = 0;
	$scope.caregiver = 0;
	$scope.foodprep = 0;
	$scope.meals = 0;
	$scope.famsize = '1';
	$scope.income = 0;

	// Contact
	$scope.first_name = "";
	$scope.last_name = "";
	$scope.phone = "";
	$scope.phone_type = "home";
	$scope.email = "";
	$scope.call_morning = 0;
	$scope.call_midday = 0;
	$scope.call_afternoon = 0;
	$scope.contact_language = "English";
	$scope.hdg_form_status = 1;

	$scope.CheckEligibility = function(){
		if($scope.ability == 1 && $scope.adult == 1 && $scope.caregiver == 1 && $scope.foodprep == 1 && $scope.meals == 1) {
			if($scope.step == 1) {
				$scope.step = 2;
			} else {
				$scope.step = $scope.income == 1 ? 3 : 0;
			}	
		} else {
			$scope.step = 0;
		}
	};

	$scope.form_ready = function(){
		return ($scope.first_name && $scope.last_name && ($scope.phone || $scope.email))
	};

	$scope.FormSubmit = function() {
		$scope.hdg_form_status = 2;
		$http.post('/api/hdg/save',{
				first_name : $scope.first_name,
				last_name : $scope.last_name,
				phone : $scope.phone,
				phone_type: $scope.phone_type,
				email : $scope.email,
				preferred_lang : $scope.contact_language,
				visit_lang: $scope.visit_lang,
				call_morning : $scope.call_morning,
				call_midday : $scope.call_midday,
				call_afternoon : $scope.call_afternoon
		}).success(function(data, status, headers, config) {
			next_step = data.success == 1 ? 4 : 5;
			$timeout(function(){
				$scope.step = next_step;
			}, 0);
		}).error(function(data, status, headers, config) {
			$timeout(function(){
				$scope.step = 5;
			}, 0);
		});
	}


}]);
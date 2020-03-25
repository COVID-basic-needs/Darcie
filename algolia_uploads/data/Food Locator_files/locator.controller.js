/**
 * Food Locator Application - Main Controller.
 *
 * @author Joshua R. Thomas
 * @version 2.1
 */
Locator.controller('FoodlocatorController',['$scope','$timeout','Languages','FedPovertyLevels',function($scope,$timeout,Languages,FedPovertyLevels) {
	$scope.visit_lang = $('html').attr('lang');
	$scope.visit_purpose = $('html').attr('data-purpose');
	$scope.visit_county = $('html').attr('data-county');
	$scope.visit_zip = $('html').attr('data-zip');
	$scope.visit_senior = $('html').attr('data-senior');
	$scope.visit_urgent = $('html').attr('data-urgent');
	$scope.visit_disabled = $('html').attr('data-disabled');
	$scope.visit_calfresh = $('html').attr('data-calfresh');
	$scope.visit_hdg = $('html').attr('data-hdg');
	$scope.auth_name = $('html').attr('data-auth');
	$scope.is_admin = $('html').attr('data-admin');
	$scope.is_editor = $('html').attr('data-editor');
	$scope.languages = Languages;
	$scope.poverty_levels = FedPovertyLevels;
	$timeout(function() {
		$scope.loading = 0;
	},0);
	
}]);
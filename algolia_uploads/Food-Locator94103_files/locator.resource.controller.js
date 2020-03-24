/**
* Food Locator Application - Resource Controller.
*
* @author Joshua R. Thomas
* @version 2.1
* @todo refactor sorting
*/
Locator.controller('ResourceController',['$scope','$http','$timeout','Languages',function($scope,$http,$timeout,Languages) {
	$scope.page_status = 'loading';
	$scope.resource = 'ngn';
	$scope.ngns = [];
	$scope.sfps = [];
	$scope.efbs = [];

	$scope.ngn_order = 'default';
	$scope.ngn_reverse = false;
	$scope.ngn_limit = 3;

	$scope.sfp_order = 'default';
	$scope.sfp_reverse = false;
	$scope.sfp_limit = 3;

	$scope.efb_order = 'default';
	$scope.efb_reverse = false;
	$scope.efb_limit = 3;

	$scope.sms_site_id = '';
	$scope.sms_telephone = '';
	$scope.sms_status = '';

	$scope.email = "";
	$scope.email_status = "";

	$scope.calendar_resource = '';
	$scope.calendar_item = null;


	$scope.ngn_sort = function(){
		if($scope.ngn_order == 'default') {
			return ['+waitlisted','-inside_zipcode','+distance','+name'];
		}
		var o = ($scope.ngn_reverse ? '-' : '+') + $scope.ngn_order;
		return [o,'+waitlisted','+distance','+name'];
	}

	$scope.sfp_sort = function(){
		if($scope.sfp_order == 'default') {
			return ['-inside_zipcode','+distance','+name'];
		}
		var o = ($scope.sfp_reverse ? '-' : '+') + $scope.sfp_order;
		return [o,'+distance','+name'];
	}

	$scope.efb_sort = function(){
		if($scope.efb_order == 'default') {
			return ['-inside_zipcode','+distance','+name'];
		}
		var o = ($scope.efb_reverse ? '-' : '+') + $scope.efb_order;
		return [o,'+distance','+name'];
	}

	$scope.sortNgns = function(field){
		if(field == 'default'){
			$scope.ngn_reverse = false;
		}
		$scope.ngn_order = field;
	}

	$scope.sortSfps = function(field){
		if(field == 'default'){
			$scope.sfp_reverse = false;
		}
		$scope.sfp_order = field;
	}

	$scope.sortEfbs = function(field){
		if(field == 'default'){
			$scope.efb_reverse = false;
		}
		$scope.efb_order = field;
	}

	$scope.sendSms = function(){
		$scope.smsstatus = 'sending';
		$http.post('/sms/site',{
				telephone : $scope.sms_telephone,
				site_id : $scope.sms_site_id,
				lang : $scope.visit_lang
		}).success(function(data, status, headers, config) {
			$scope.sms_status = data.sent ? 'success' : 'error' ;
			$timeout(function(){
				$scope.sms_status = '';
			},5000);
		}).error(function(data, status, headers, config) {
			$scope.sms_status = 'error';
			$timeout(function(){
				$scope.smsstatus = '';
			},5000);
		});
	}

	$scope.emailLink = function(){
		url = $scope.visit_lang + "/" + $scope.visit_county;
		if($scope.visit_zip != 'unknown' ){
			url += "/"+ $scope.visit_zip ;
		}
		if($scope.visit_senior === "1"){
			url += "/senior";
		}
		if($scope.visit_urgent === "1"){
			url += "/urgent";
		}
		if($scope.visit_disabled === "1"){
			url += "/disabled";
		}
		if($scope.visit_calfresh === "1"){
			url += "/calfresh";
		}
		if($scope.visit_hdg === "1"){
			url += "/hdg";
		}
		$scope.email_status = 'sending';
		$http.post('/email/link',{
			email: $scope.email,
			visit_path: url,
			visit_lang : $scope.visit_lang
		}).success(function(data, status, headers, config) {
			$scope.email_status = data.sent ? 'success' : 'error' ;
			$timeout(function(){
				$scope.email_status = '';
			},5000);
		}).error(function(data, status, headers, config) {
			$scope.email_status = 'error';
			$timeout(function(){
				$scope.email_status = '';
			},5000);
		});
	}


	$scope.getResources = function(){
		$timeout(function(){
			$http.post('/resource',{
				 visit_county : $scope.visit_county,
				 visit_zip : $scope.visit_zip,
				 visit_senior : $scope.visit_senior,
				 visit_urgent : $scope.visit_urgent,
				 visit_disabled : $scope.visit_disabled,
				 visit_lang : $scope.visit_lang,
				 visit_calfresh : $scope.visit_calfresh,
				 visit_hdg : $scope.visit_hdg
			}).success(function(data, status, headers, config) {
				if(data && status == 200){
					$scope.ngns = angular.fromJson(data.ngns);
					$scope.sfps = angular.fromJson(data.sfps);
					$scope.efbs = angular.fromJson(data.efbs);
					$scope.page_status = "ready";
				}else{
					$scope.page_status = "error";
				}
			}).error(function(data, status, headers, config) {
				$scope.page_status = "error";
			});
		});
	}

	$scope.toggleCalendar = function(resource, item) {
		$scope.calendar_resource = resource;
		$scope.calendar_item = item;
		angular.element('.bs-calendar').datepicker();
	};

	$scope.showMore = function(bool){
		$scope.loadingMore = bool ? 1 : 0;
		var rtype = $scope.resource;
		$timeout(function(){
			if(rtype == 'sfp'){
				$scope.sfp_limit = bool ? $scope.sfps.length : 3;
			} else {
				$scope.ngn_limit = bool ? $scope.ngns.length : 3;
			}
			
		}, 500);
		$timeout(function(){
			$scope.loadingMore = 0;
		}, 3000);
	};

	$scope.$watch('ngn_limit + resource', function() {
		$('footer').css('margin-bottom', function(){
			return $scope.ngn_limit > 3 && $scope.resource == 'ngn' ? '50px' : '0px';
		});
	});

	$timeout(function() {
		if($scope.visit_purpose == 'resources'){
			$scope.getResources();
		}
	},0);
	
}]);
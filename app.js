(function(){

	angular.module('PharmacyApp',[])
	.constant('constants',{
		URL: 'http://35.162.48.28/api'
	})

	.controller('MainController', mainCtrl);


	mainCtrl.$inject = ['$scope','$http','constants'];
	function mainCtrl($scope,$http,constants){

		var mc = this;
		var url = constants.URL;
		// 
		mc.params = {
			page : 0,
			limit : 20	
		};
		// ----------------
		// defaults
		mc.pagesCount = 0;
		mc.curentPage = 0;
		mc.pageNumbers = [];
		mc.limitOptions = [10,20,40];
		mc.selectedOption = 20;
		// ----------------
		// init
		getDrugs();

 		function getDrugs(params){
 			var params = params || mc.params;
 			console.warn(params);
 			if(params.page < 0){
 				return;
 			}
			$http.get(url + '/search', {params:params}).then(
				function success(response){
					mc.drugs = response.data.results;
					mc.pagesCount = response.data.pages;
					mc.currentPage = response.data.page;
					createPagination();
					console.warn(response);
				},
				function error(error){
					console.warn(error);
				});
		};

		function createPagination(){
			var start = mc.currentPage || 0,
				end = start + 7;
				mc.pageNumbers = [];
				while (start < end){
					mc.pageNumbers.push(start);
					start ++;
				}
				console.warn(mc.pageNumbers);
		};

		//--------------------
		// CLICK/CHANGE EVENTS 

		mc.changeLimit = function(value){
			var params = mc.params;
			params.limit = mc.selectedOptin = value;
			getDrugs(params);
		}

		// pagination functions
		
		mc.previousPage = function(){
			var params = mc.params;
			if(params.page == 0){
				return;
			}
			params.page--;
			getDrugs(params);
		};

		mc.getPage = function(pageNum){
			mc.params.page = pageNum;
			getDrugs();
		}

		mc.nextPage = function(){
			var params = mc.params;
			params.page++;
			getDrugs(params);
		};

	};

})();
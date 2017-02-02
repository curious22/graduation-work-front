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
			limit : 20,
			title : '',
			category: ''
		};
		// ----------------
		// defaults
		mc.pagesCount = 0;
		mc.curentPage = 0;
		mc.pageNumbers = [];
		mc.categories = [];
		mc.limitOptions = [10,20,40];
		mc.selectedOption = 20;
		mc.tooltipShown = false;
		// ----------------
		// init
		getDrugs();


		/**
		 * [getDrugs description]
		 * @param  {[type]} params [description]
		 * @return {[type]}        [description]
		 */
 		function getDrugs(params){
 			var params = params || mc.params;
 			if(params.page < 0){
 				return;
 			}
			$http.get(url + '/search', {params:params}).then(
				function success(response){
					mc.drugs = response.data.results;
					mc.pagesCount = response.data.pages;
					mc.currentPage = response.data.page;
					createPagination();
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
		};

		// FILTERING WITH CATEGORIES AND TITLE 

		mc.searchWithParams = function(title,category){
			var params = mc.params;
			mc.selectedOption = params.category  = category;
			mc.selectedOption = params.title  = title;
			getDrugs(params)
		};

		// TOOLTIP FUNCTIONS

		mc.showTooltip = function(obj){
			obj.tooltipShown = true;
		};

		mc.closeTooltip = function(obj){
			obj.tooltipShown = false;
		};

		//--------------------
		// CLICK/CHANGE EVENTS 

		mc.changeLimit = function(value){
			var params = mc.params;
			mc.selectedOption = params.limit  = value;
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
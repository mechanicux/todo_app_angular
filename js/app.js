// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/todoApp', function(err) {
// 	if (err) {
// 		console.log('connection error', err);
// 	}
// 	else {
// 		console.log ('connection success!');
// 	}
// });

var todoApp = angular.module('todoApp', ['lumx']);

todoApp.filter('orderBySetFilter', function() {
	return function(items, filterName) {
		var sorted = [];

		sorted = _.sortBy(items, filterName);
		if (filterName == 'reverse') {
			sorted.reverse();
		}

		return sorted;

	};

});


todoApp.controller('ListController', ['$scope', function($scope) {
	
	$scope.count = 1; // example item is checked at init
	$scope.filterName = '';	  // items are not sorted at first
	// $scope.myPriority = {   // default priority is none
	// 	name: 'None',
	// 	id: '4'
	// };
	$scope.manage = 'Select';   // 
	$scope.default_date = {
		        date: undefined,
                formatted: undefined
	};


	$scope.priorities = [
	    { name: 'Urgent',				id: 1 },
	    { name: 'Very important',   	id: 2 },
	    { name: 'Not important',  		id: 3 },
	    { name: 'None',  				id: 4 }
	];

    $scope.selects = {
        selectedPriority: undefined,
    };

	// initial array 
	$scope.items = [
		{name:'Create your first task',
		checked: false,
		priority: 1,
		date_due: '1/1/15'}, 

		{name: 'Clear your first task',
		checked: true,
		priority: 4,
		date_due: '2/1/15'
	}
		];


	$scope.addToList = function(newItem) {

		if (!(newItem == null) && newItem != '') { // only add new item to list if not empty
	
			$scope.items.push({
			name: newItem,
			checked: false,
			priority: $scope.selects.selectedPriority,
			// set date due to default (empty) if user has not selected a date 
			date_due: ($scope.datepicker != undefined ? $scope.datepicker.date : $scope.default_date)
		});

			// reset default variables
		$scope.newItem = '';
		$scope.selects.selectedPriority = undefined;

	
		}

	};

/* New item object :
	name: ''
	checked: 
	date_due: default
	priority: default
	category/list? default

*/


// Update number of items in list checked every time another one is checked or unchecked
	$scope.countUpdate = function(item) {

		if ($scope.count == 'all') { 
			$scope.count = $scope.items.length; // reset to numerical value to evaluate
			$scope.manage = 'Select';
		}

		if (item.checked) {
			$scope.count++;
		}
		else {
			$scope.count--;
		}

		if ($scope.count == $scope.items.length) {
			$scope.count = 'all'; // for display purposes
			$scope.manage = 'Unselect';
		}

	};


	$scope.removeFromList = function() {

		var i;

		for (i = $scope.items.length-1; i >= 0; i--) {
		  if($scope.items[i].checked) {
			 $scope.items.splice(i, 1);
		} 

		$scope.count = 0;  
		$scope.manage = 'Select'; 

	} 
	};

	$scope.setFilter = function(newFilterName) {
		$scope.filterName = newFilterName;
	};

	$scope.setPriority = function(newPriority, newPriorityName) {
		$scope.priority = newPriority;
		$scope.priorityName = newPriorityName;
	};

	$scope.manageAll = function() {
		var i = 0;
		for (i = 0; i < $scope.items.length; i++) {
			if ($scope.items[i].checked == false && $scope.manage == 'Select') {
				$scope.items[i].checked = true;
				$scope.count++;

			}
			else if ($scope.items[i].checked == true && $scope.manage == 'Unselect') {
				$scope.items[i].checked = false;
				$scope.count--;
			}
		}

		if ($scope.manage == 'Select') {
			$scope.manage = 'Unselect';
		}  else {
			$scope.manage = 'Select';
		}
	};


}]);




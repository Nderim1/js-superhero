angular.module('jsSuperheroApp', ['ui.router', 'rzModule'])

	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/')

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'pages/home.html',
				controller: 'mainController'
			})
			.state('results', {
				url: '/results',
				templateUrl: 'pages/results.html',
				controller: 'resultsController'
			});
	})

	.controller('mainController', function($scope, $state, dataService) {

		$scope.jsExperience = 0
		$scope.age = 22

		$scope.angularOpt = {
			name: 'angular',
			love: 100,
			experience: 0,
			iconClass: "devicon-angularjs-plain colored"
		}
		$scope.reactOpt = {
			name: 'react',
			love: 100,
			experience: 0,
			iconClass: "devicon-react-plain colored"
		}
		$scope.vueOpt = {
			name: 'vue',
			love: 100,
			experience: 0,
			iconClass: "devicon-vuejs-plain colored"
		}
		$scope.jqueryOpt = {
			name: 'jquery',
			love: 100,
			experience: 0,
			iconClass: "devicon-jquery-plain colored"
		}

		$scope.experienceSlider = {
			options: {
			  showTicks: true,
			  stepsArray: [
				{value: 0},
				{value: 1},
				{value: 2},
				{value: 3},
				{value: 4},
				{value: 5}
			  ]
			}
		}

		$scope.coloredSlider = {
			options: {
			  ceil: 100,
			  showSelectionBar: true,
			  selectionBarGradient: {
				from: 'white',
				to: 'green'
			  }
			}
		  };

		$scope.saveData = function() {
			var dataToSave = {
				age: $scope.age,
				jsExp: $scope.jsExperience,
				frameworks: []
			}

			$scope.angularjs && dataToSave.frameworks.push($scope.angularOpt),
			$scope.reactjs && dataToSave.frameworks.push($scope.reactOpt),
			$scope.vuejs && dataToSave.frameworks.push($scope.vueOpt),
			$scope.jquery && dataToSave.frameworks.push($scope.jqueryOpt),

			dataService.saveData(dataToSave)
			$state.go('results')
		}
	})

	.controller('resultsController', function($scope, dataService) {
		
		dataService.getData(function(data){
			var allPoints = []
			data.frameworks.sort(function(a, b){
				return (b.love + b.experience) - (a.love + a.experience)
			})

			$scope.frameworkName = data.frameworks[0].name
			$scope.iconClass = data.frameworks[0].iconClass
		})
		
	})

	.service('dataService', function() {
		this.userData = {}

		this.saveData = function(data) {
			this.userData = data
		}

		this.getData = function(callback) {
			return callback(this.userData)
		}
	})
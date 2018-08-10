const myAnimalApp = angular.module('myAnimalApp', ['ngRoute']);

myAnimalApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: './views/home.html',
      controller: 'myHomeController'
    })
    .when('/game', {
      templateUrl: './views/game.html',
      controller: 'myGameController',
    })
    .when('/game-complete', {
      templateUrl: './views/game-complete.html',
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}])

myAnimalApp.factory('store', function($http) {
  var store = {}

  store.animals = [];
  store.solvedAnimals = [];
  store.remainingAnimals = [];
  store.animalIndex = 0;
  store.currentAnimal = null;
  store.gameMode = 'abc';

  $http
    .get('./data/data.js')
    .then(({ data }) => {
      store.animals = data;
      store.remainingAnimals = data.slice();
    })

  return store;
})

myAnimalApp.controller('myGameController', 
  ['$scope', '$location', 'store', function($scope, $location, store) {
  
  $scope.showCurrentAnimal = () => {
    return store.currentAnimal;
  }

  $scope.updateIndex = () => {
    if (store.gameMode === 'abc') {
      store.animalIndex += 1;
    } else if  (store.gameMode === 'cba') {
      store.animalIndex -= 1;
    } else {
      store.animalIndex = Math.floor(Math.random() * store.remainingAnimals.length);
    }
  }
  
  $scope.checkLetter = (letter) => {
    //if letter spoken === letter of animal

    if ($scope.remainingAnimals.length === 0) {
      //set win message
      $location.path('/game-complete');

    }
  }

  $scope.displayMode = 'letter'; 
}])


myAnimalApp.controller('myHomeController', 
  ['$scope', '$location', 'store', function($scope, $location, store) {

  //functions
  $scope.startGame = (option) => {
    //reset game data
    store.solvedAnimals = [];
    store.remainingAnimals = store.animals.slice();
    store.gameMode = option;

    //function to start game
    //depending on option, set the starting $scope.index
    if (option === 'cba') {
      store.animalIndex = store.remainingAnimals.length - 1;
    } else if (option === 'cab') {
      store.animalIndex = Math.floor(Math.random() * store.remainingAnimals.length);
    }

    store.currentAnimal = store.remainingAnimals[store.animalIndex];
    $location.path('/game');
  }
}])
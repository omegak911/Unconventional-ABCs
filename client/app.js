const myAnimalApp = angular.module('myAnimalApp', ['ngRoute']);

myAnimalApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: './client/views/home.html',
      controller: 'myHomeController'
    })
    .when('/game', {
      templateUrl: './client/views/game.html',
      controller: 'myGameController',
    })
    .when('/game-complete', {
      templateUrl: './client/views/game-complete.html',
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}])

myAnimalApp.factory('store', function($http) {
  var store = {}

  store.animals = [];
  store.remainingAnimals = [];
  store.animalIndex = 0;
  store.currentAnimal = null;
  store.gameMode = 'abc';

  $http
    .get('./client/data/data.js')
    .then(({ data }) => {
      store.animals = data;
      store.remainingAnimals = data.slice();
    })
  return store;
})

myAnimalApp.controller('myGameController', 
  ['$scope', '$location', '$interval', 'store', function($scope, $location, $interval, store) {
  
  const SpeechRecognitionSetup = () => {
    // const grammar = ['j','k','i']
    // const grammar = '#JSGF V1.0; grammar letters; public <letter> = a | b | i | j | k ;'
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammerList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent
  
    const recognition = new SpeechRecognition();
    const SpeechRecognitionList = new SpeechGrammerList();
    // SpeechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = SpeechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = async (event) => {
      let letter = event.results[0][0].transcript;
      //if correct, swap to animalDisplay
      if (letter[0].toLowerCase() === store.currentAnimal.name[0].toLowerCase()) {
        const decrement = $interval(() => $scope.countdown -= 1, 1000);
        $scope.displayMode = 'animal';
        $scope.$apply();
        //update to next letter after 5 seconds
        setTimeout( async () => {
          await $interval.cancel(decrement);
          await $scope.updateRemainingAndSolved();
          await recognition.stop();
          await $scope.updateIndex();
        }, 5000);
      } else {
        //we'll probably want to display a error message on the front end
        console.log('please try again')
        recognition.stop();
      }
    }

    recognition.onend = () => {
      if (store.remainingAnimals.length > 0) {
        SpeechRecognitionSetup();
      }
    }
  }

  $scope.countdown = 5;
  $scope.showCurrentAnimal = store.currentAnimal;
  $scope.solvedLetters = [];

  $scope.updateIndex = () => {
    if (store.remainingAnimals.length === 0) { //game complete
      $location.path('/game-complete');
      $scope.$apply()
    } else {  //update next letter
      if (store.gameMode === 'cba') {
        store.animalIndex -= 1;
      } else {
        store.animalIndex = Math.floor(Math.random() * store.remainingAnimals.length);
      }
      store.currentAnimal = store.remainingAnimals[store.animalIndex];
      $scope.showCurrentAnimal = store.currentAnimal;
      $scope.displayMode = 'letter';
      $scope.countdown = 5;
      $scope.$apply();
    }
  }

  $scope.updateRemainingAndSolved = () => {
    const animal = store.remainingAnimals.splice(store.animalIndex, 1)[0];
    $scope.solvedLetters.push(animal.name[0]);
  }

  $scope.displayMode = 'letter'; 
  if (store.remainingAnimals.length > 0) {
    SpeechRecognitionSetup();
  }
}])


myAnimalApp.controller('myHomeController', 
  ['$scope', '$location', 'store', function($scope, $location, store) {

  if (!('webkitSpeechRecognition') in window) {
    alert('WebkitSpeechRecognition is required to use this app.  Please update your browser (Chrome, Edge, Firefox) before proceeding')
  }

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
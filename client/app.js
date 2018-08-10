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
      console.log(letter)
      console.log(store.currentAnimal.name);
      if (letter[0].toLowerCase() === store.currentAnimal.name[0].toLowerCase()) {
        console.log('correct!')

        //switch to animalDisplay
        //maybe have speechsynthesis
        //after 3-5 seconds, move onto the next letter
        $scope.displayMode = 'animal';
        $scope.$apply();
        setTimeout(() => $scope.updateIndex(), 5000);

      } else {
        console.log('please try again')
      }

      recognition.stop();
    }

    recognition.onend = () => {
      SpeechRecognitionSetup();
    }

  }

  $scope.showCurrentAnimal = store.currentAnimal;

  $scope.updateIndex = () => {
    if (store.gameMode === 'abc') {
      store.animalIndex += 1;
    } else if  (store.gameMode === 'cba') {
      store.animalIndex -= 1;
    } else {
      store.animalIndex = Math.floor(Math.random() * store.remainingAnimals.length);
    }
    store.currentAnimal = store.remainingAnimals[store.animalIndex];
    $scope.showCurrentAnimal = store.currentAnimal;
    $scope.displayMode = 'letter';
    $scope.$apply();
  }

  $scope.displayMode = 'letter'; 
  SpeechRecognitionSetup();
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
const myAnimalApp = angular.module('myAnimalApp', ['ngRoute']);

myAnimalApp.config(['$routeProvider', ($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: './views/home.html',
      controller: 'myAnimalController'
    })
    .when('/game', {
      templateUrl: './views/game.html',
      controller: 'myAnimalController'
    })
    .otherwise({
      redirectTo: '/'
    });
}])

myAnimalApp.controller('myAnimalController', ['$scope', function($scope) {
  //main data - do not modify!!
  $scope.animals = [
    {
      name: 'Aye Aye',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Wild_aye_aye.jpg/500px-Wild_aye_aye.jpg',
    },
    {
      name: 'Bandicoot',
      img: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Perameles_gunni.jpg',
    },
    {
      name: 'Cichlid',
      img: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Freshwater_angelfish_biodome.jpg',
    },
    {
      name: 'Dogue De Bordeaux',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/DJT_0086.jpg/800px-DJT_0086.jpg',
    },
    {
      name: 'Elephant Shrew',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Rhynchocyon_petersi_from_side.jpg/800px-Rhynchocyon_petersi_from_side.jpg',
    },
    {
      name: 'Frigate Bird',
      img: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Male_Frigate_bird.jpg',
    },
    {
      name: 'Green Bee-Eater',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Green_bee-eater_%28Merops_orientalis%29_Photograph_by_Shantanu_Kuveskar.jpg/320px-Green_bee-eater_%28Merops_orientalis%29_Photograph_by_Shantanu_Kuveskar.jpg',
    },
    {
      name: 'Hawaiian Honeycreeper',
      img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Iiwi.jpg',
    },
    {
      name: 'Indri',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Indri_indri_001.jpg/800px-Indri_indri_001.jpg',
    },
    {
      name: 'Jeroba',
      img: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Four-toes-jerboa.jpg',
    },
    {
      name: 'Kakapo',
      img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Sirocco_full_length_portrait.jpg',
    }
  ]

  //functions
  $scope.startGame = (option) => {
    $scope.remainingAnimals = $scope.animals.slice();
    $scope.solvedAnimals = [];
    $scope.gameMode = option;

    //function to start game
    //depending on option, set the starting $scope.index
  }

  
  $scope.updateIndex = () => {
    if ($scope.gameMode === 'abc') {
      $scope.index += 1;
    } else if  ($scope.gameMode === 'cba') {
      $scope.index -= 1;
    } else {
      $scope.index = Math.floor(Math.random() * $scope.animals.length);
    }
  }
  
  $scope.checkLetter = (letter) => {
    //if letter spoken === letter of animal
  }
  
  
  //data
  $scope.solvedAnimals = [
    //upon solving, push solved here to display on the side
  ]

  $scope.remainingAnimals = [];

  $scope.gameMode = 'abc'; //determines how index will be chosen (increment, decrement, random)
  $scope.index = 0;

  
}])
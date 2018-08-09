const myAnimalApp = angular.module('myAnimalApp', []);

myAnimalApp.controller('myAnimalController', ['$scope', ($scope) => {
  //functions
  $scope.startGame = (option) => {
    $scope.gameMode = option;
    //function to start game
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

  $scope.gameMode = 'abc'; //determines how index will be chosen (increment, decrement, random)
  $scope.index = 0;

  $scope.animals = [
    {
      name: 'Aye Aye',
      img: '',
    },
    {
      name: 'Bandicoot',
      img: '',
    },
    {
      name: 'Cichlid',
      img: '',
    },
    {
      name: 'Dogue De Bordeaux',
      img: '',
    },
    {
      name: 'Elephant Shrew',
      img: '',
    },
    {
      name: 'Frigate Bird',
      img: '',
    },
    {
      name: 'Green Bee-Eater',
      img: '',
    },
    {
      name: 'Hawaiian Honeycreeper',
      img: '',
    },
    {
      name: 'Indri',
      img: ''
    },
    {
      name: 'Jeroba',
      img: '',
    },
    {
      name: 'Kakapo',
      img: '',
    }
  ]
}])
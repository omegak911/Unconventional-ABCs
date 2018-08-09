const myAnimalApp = angular.module('myAnimalApp', []);

myAnimalApp.controller('myAnimalController', ['$scope', ($scope) => {
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
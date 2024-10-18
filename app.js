var app = angular.module('myApp', []);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);

app.controller('SudokuController', function($scope, $http) {
    $scope.matrix = [];
    $scope.editMode = {};
    $scope.errorMessage = '';

    $http.get('http://localhost:8080/sudoku/')
        .then(function(response) {
            $scope.matrix = response.data;
        }, function(error) {
            console.error('Ошибка при получении данных:', error);
        });

    $scope.sendValue = function(rowIndex, cellIndex, value) {
        var data = {
            table: 'sudoku',
            x: rowIndex,
            y: cellIndex,
            value: value
        };

        $http.post('http://localhost:8080/sudoku/', data)
            .then(function(response) {
                if (response.data.errorMessage) {
                    $scope.matrix = response.data.matrix;
                    $scope.errorMessage = response.data.errorMessage;
                } else {
                    $scope.matrix = response.data.matrix;
                    $scope.errorMessage = '';
                }
            }, function(error) {
                console.error('Ошибка при отправке данных:', error);
            });
    };
});

//logic part

var app = angular.module('App', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partial/list.html',
                controller: 'List'
            })
            .when('/data/:id', {
                templateUrl: 'partial/listItem.html',
                controller: 'ListItem'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

app.controller('List', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http.get('http://jsonplaceholder.typicode.com/posts').then(function(response){
        $scope.$parent.data = response.data;
        $scope.data = response.data;
    }, function(err) {
        throw err;
    });

    $scope.openArticle = function(id, e) {
        e.preventDefault();
        $location.path('/data/' + id);
    };
}]);

app.controller('ListItem', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('http://jsonplaceholder.typicode.com/posts/' + $routeParams.id).then(function(response) {
        $scope.item = response.data;
    }, function(err) {
        throw err;
    });
}]);

app.controller('Nav', ['$scope', function($scope) {
    $scope.nav = false;
    $scope.openClose = function(e) {
        e.preventDefault();
        $scope.nav =  !$scope.nav;
    }
}]);

// ordinary script
function popupInit() {
    var btn = document.querySelectorAll('.btn');
    var popup = document.querySelectorAll('.popup');
    var shadow = document.querySelector('.shadow');
    var close = document.querySelectorAll('.popup .close');

    for(var i = 0 ; i < btn.length; i++) {
        btn[i].onclick = function(x) {
            return function() {
                for(var j = 0; j < popup.length; j++) {
                    if(popup[j].getAttribute('data-modal') === btn[x].getAttribute('data-modal-open')) {
                        shadow.className += ' active';
                        popup[j].className += ' active';
                    }
                }
                return false;
            }
        }(i);
    }
    for(var i = 0 ; i < close.length; i++) {
        close[i].onclick = function(x) {
            return function() {
                shadow.className = 'shadow';
                for(var j = 0; j < popup.length; j++) {
                    popup[j].className = 'popup';
                }
                return false;
            }
        }(i);
    }
}
popupInit();
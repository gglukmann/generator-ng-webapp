angular.module('app', ['ui.router'])
    .config(['$stateProvider', function($stateProvider) {
            //The states
            $stateProvider
              .state('index', {
                url: "",
                templateUrl: "../../includes/views/index.html"
              });
        }]
    );

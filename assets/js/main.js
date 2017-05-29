var app = angular.module("myApp", []);
app.controller('mainCtrl', function($scope) {
    $scope.getValue = function($event){
        var target = angular.element($event.currentTarget).parent();
        $scope.$broadcast('$getValue', target, $scope.value);
        console.log('get value - ', $scope.value);
    }
    $scope.setValue = function($event, index){
        var target = angular.element($event.currentTarget).parent();
        if (index) {
            $scope.$broadcast('$setValue', index, target);
            console.log('set value -', index);
        }
    }
});
function inputCtrl($rootScope) {
    this.inputValue = '';
    function addValue() {
        if (this.inputValue !== '') {
            $rootScope.$emit("magicEvent", this.inputValue); 
        }
        this.inputValue = '';
    };
    this.addValue = addValue;
}
function outputCtrl($rootScope) {
    this.values = [];
    var valuesArr = this.values;
    $rootScope.$on('magicEvent', function (event, data) {
        //console.log(data);
        valuesArr.push(data);
    });
}
app.component('inputControl', {  
    templateUrl: 'inputTemplate',
    transclude: true,
    bindings: {
      inputValue: '@'
    },
    controller: ['$rootScope', inputCtrl]
});

app.component('outputControl', {
    templateUrl: 'outputTemplate',
    controller: ['$rootScope', outputCtrl]
});

app.directive('jqCombobox', [function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            console.log(elem);
            angular.element(elem).combobox(scope.$eval(attrs.jqCombobox));
            scope.$on("$getValue", function(event, target){
                scope.value = target.combobox("getValue");
            });
            scope.$on("$setValue", function(event, index, target){
                target.combobox("setValue", index);
            });
        }
    };
}]);
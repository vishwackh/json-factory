var myapp = angular.module('myApp', []);


myapp.directive('ajaxLoader', function(){
	return {
	  restrict:'A',
	  template : '<div class="ajax-loader"></div>'

	};
});

myapp.directive('aDisabled', function() {
	return {
		restrict: 'C',
		link: function(scope, element, attrs) {
			if ($(element).attr('href')) {
				$(element).on('click', function(e) {
					//e.preventDefault();
					return false;
				});
			}
		}
	};
});
 
//creating custom directive
myapp.directive('ngCompare', function () {
 return {
 require: 'ngModel',
 link: function (scope, currentEl, attrs, ctrl) {
 var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
 compareEl = angular.element(comparefield);
 
 //current field key up
 currentEl.on('keyup', function () {
 if (compareEl.val() != "") {
 var isMatch = currentEl.val() === compareEl.val();
 ctrl.$setValidity('compare', isMatch);
 scope.$digest();
 }
 });
 
 //Element to compare field key up
 compareEl.on('keyup', function () {
 if (currentEl.val() != "") {
 var isMatch = currentEl.val() === compareEl.val();
 ctrl.$setValidity('compare', isMatch);
 scope.$digest();
 }
 });
 }
 }
 
});
 
// create angular controller
myapp.controller('mainController', function ($scope) {
 
 $scope.countryList = [
 { CountryId: 1, Name: 'India' },
 { CountryId: 2, Name: 'USA' }
 ];
 
 $scope.cityList = [];
 
 $scope.$watch('user.country', function (newVal,oldVal) {
 
 if (newVal == 1)
 $scope.cityList = [
 { CountryId: 1, CityId: 1, Name: 'Noida' },
 { CountryId: 1, CityId: 2, Name: 'Delhi' }];
 else if (newVal == 2)
 $scope.cityList = [
 { CountryId: 2, CityId: 3, Name: 'Texas' },
 { CountryId: 2, CityId: 4, Name: 'NewYork' }];
 else
 $scope.cityList = [];
 });
 
 // function to submit the form after all validation has occurred 
 $scope.submitForm = function () {
 $scope.loginLoader = true;
 // Set the 'submitted' flag to true
 $scope.submitted = true;
 
 if ($scope.userForm.$valid) {
 alert("Form is valid!");
 $scope.loginLoader = false;
 }
 else {
 //alert("Please correct errors!");
 }
 };
 
});

myapp.directive('pwCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
});
myapp.directive('checkStrength', function () {

    return {
        replace: false,
        restrict: 'EACM',
        link: function (scope, iElement, iAttrs) {

            var strength = {
                colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
                mesureStrength: function (p) {

                    var _force = 0;                    
                    var _regex = /[$-/:-?{-~!"^_`\[\]]/g;
                                          
                    var _lowerLetters = /[a-z]+/.test(p);                    
                    var _upperLetters = /[A-Z]+/.test(p);
                    var _numbers = /[0-9]+/.test(p);
                    var _symbols = _regex.test(p);
                                          
                    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];                    
                    var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;                                          
                    
                    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                    _force += _passedMatches * 10;
                        
                    // penality (short password)
                    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;                                      
                    
                    // penality (poor variety of characters)
                    _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                    _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                    _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;
                    
                    return _force;

                },
                getColor: function (s) {

                    var idx = 0;
                    if (s <= 10) { idx = 0; }
                    else if (s <= 20) { idx = 1; }
                    else if (s <= 30) { idx = 2; }
                    else if (s <= 40) { idx = 3; }
                    else { idx = 4; }

                    return { idx: idx + 1, col: this.colors[idx] };

                }
            };

            scope.$watch(iAttrs.checkStrength, function () {
                if (scope.pw === '') {
                    iElement.css({ "display": "none"  });
                } else {
                    var c = strength.getColor(strength.mesureStrength(scope.pw));
                    iElement.css({ "display": "inline" });
                    iElement.children('li')
                        .css({ "background": "#DDD" })
                        .slice(0, c.idx)
                        .css({ "background": c.col });
                }
            });

        },
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
    };

});
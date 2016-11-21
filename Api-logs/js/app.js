var myapp = angular.module('myApp', []);

myapp.controller('mainController', function ($scope,$http) {
  $scope.text;
  $scope.words;
  $scope.ids = [];
  $scope.loader=false;
  var k=0;
var r = /\d{13}-\d{1,9}/;

 $scope.submitForm = function (pathurl) {

     if ($scope.userForm.$valid) {
       $scope.loader=true;
         $http.get(pathurl)
        .then(function(response) {
            $scope.text = response.data;
            $scope.words = $scope.text.split("\n");
            console.log($scope.words);

    for(i in $scope.words) {
       if($scope.words[i].match(r)){
          $scope.ids[k++] = $scope.words[i].match(r)[0];
          } 
      }
        $scope.loader=false;
        });   

     }
     else {
    console.log("Please correct errors!");
    $scope.loader=false;
     }
 };

 var found = [],j=0,tempend=0;

 $scope.search = function (word) {
    for(i in $scope.words) {
        var smvlue = $scope.words[i].toString();
       if($scope.words[i].match(r) == word){
          found[j++] = i;
          }  
    }

    var a=found[found.length-1];

     for(var i=parseInt(a)+1;i<$scope.words.length;i++) {   
        if($scope.words[i].match(r)){
          tempend= i;
          break;
        }
     }
console.log("a",a+"b",tempend);
    var data ='[{';

    for(var i=parseInt(a)+1;i<tempend;i++){
    data = data + $scope.words[i];
    }
    try{
         $scope.done = angular.fromJson(data);
         $scope.error ='';
        if(data === "[{"){
          $scope.error = "Data Not Found";
        }
    }
   catch(e){
        console.log("no json found",e);
        $scope.done = '';
		$scope.error = "Data Not Found";
   }
         
 }; 

});

 
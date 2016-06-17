angular.module('app.controllers', [])

.controller('tapBusCtrl', function($scope) {
    $scope.data = {};
})

.controller('mapCtrl', function($scope, $filter, $state, $cordovaGeolocation, nfcService) {

    $scope.data = {};
    $scope.id = [1,1,1];

    $scope.tag = nfcService.tag;

    $scope.setLat = function(input){
      return $filter('testf')(input);
    };

    $scope.clear = function() {
        nfcService.clearTag();
    };

    $scope.$watch('tag', function (new_fieldcontainer, old_fieldcontainer) {
        if (typeof old_fieldcontainer === 'undefined') return;
        //$scope.latLngList = $filter('testf')($scope.tag.ndefMessage[0]);
        alert($scope.latLngList);
        alert($scope.tag.ndefMessage);
    });
    $scope.$watch('tag', function () {
        alert("olar0");
        $scope.latLngList = nfc
        //$scope.latLngList = $filter('testf')($scope.tag.ndefMessage[0]);
        ++$scope.id[0];
        alert($scope.tag.ndefMessage);
    });
    $scope.$watch('nfcService.tag', function () {
        alert("olar1");
        ++$scope.id[1];
    });
    $scope.$watch('$scope.tag', function () {
        alert("olar2");
        ++$scope.id[2];
    });

    // if($scope.tag){
    //   $scope.cordovaLocation(latLngList);
    // }

    var options = {timeout: 10000, enableHighAccuracy: true};

    // $scope.cordovaLocation = function(latLngList){
    //   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    //
    //       //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //       var latLng = new google.maps.LatLng(latLngList[0], latLngList[1]);
    //
    //       var mapOptions = {
    //           center: latLng,
    //           zoom: 15,
    //           mapTypeId: google.maps.MapTypeId.ROADMAP
    //       };
    //
    //       $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //
    //       google.maps.event.addListenerOnce($scope.map, 'idle', function(){
    //
    //           var marker = new google.maps.Marker({
    //               map: $scope.map,
    //               animation: google.maps.Animation.DROP,
    //               position: latLng
    //           });
    //
    //           var infoWindow = new google.maps.InfoWindow({
    //               content: "Here I am!"
    //           });
    //
    //           google.maps.event.addListener(marker, "click", function(){
    //               infoWindow.open($scope.map, marker);
    //           });
    //
    //       });
    //
    //   }, function(error) {
    //       console.log("Could not get location");
    //   });
    //
    // }


})

.controller('placesNearbyCtrl', function($scope, nfcService) {
    $scope.data = {};

    $scope.tag = nfcService.tag;

    $scope.clear = function() {
        nfcService.clearTag();
    };
});

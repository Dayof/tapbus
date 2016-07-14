angular.module('app.controllers', [])

.controller('tapBusCtrl', function($scope) {
    $scope.data = {};
})

.controller('mapCtrl', function($scope, $filter, $state, $cordovaGeolocation, $ionicLoading) {

    $scope.data = {};
    $scope.latLngList = [];
    //
    // $scope.tag = nfcService.tag;

    $scope.setLat = function(input){
      $scope.latLngList = $filter('testf')(input);
    };

    // $scope.clear = function() {
    //     nfcService.clearTag();
    // };

    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        $scope.map = map;

        google.maps.event.addListenerOnce($scope.map, 'idle', function(){

          var marker = new google.maps.Marker({
             map: $scope.map,
             animation: google.maps.Animation.DROP,
             position: myLatlng
          });

          var infoWindow = new google.maps.InfoWindow({
             content: "Here I am!"
          });

          google.maps.event.addListener(marker, "click", function(){
             infoWindow.open($scope.map, marker);
          });

        });
    });


    // $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    //
    //       //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //       var latLng = new google.maps.LatLng(parseFloat(latLngList[0]), parseFloat(latLngList[1]));
    //       alert(latLng);
    //       var mapOptions = {
    //           center: latLng,
    //           zoom: 15,
    //           mapTypeId: google.maps.MapTypeId.ROADMAP
    //       };
    //
    //       // $scope.$watch('tag', function(newValue, oldValue) {
    //       //
    //       // });
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
    //           $scope.$apply()
    //     });
    //
    //   }, function(error) {
    //       console.log("Could not get location");
    //   });

})

.controller('placesNearbyCtrl', function($scope, nfcService) {
    $scope.data = {};

    $scope.tag = nfcService.tag;

    $scope.clear = function() {
        nfcService.clearTag();
    };
});

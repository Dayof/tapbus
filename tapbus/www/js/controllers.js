angular.module('app.controllers', [])

.controller('tapBusCtrl', function($scope) {
    $scope.data = {};
})

.controller('mapCtrl', function($scope, $rootScope, $filter, $state, $ionicLoading, nfcService) {

    $scope.data = {};
    //$scope.latLngList = [];
    //
    $scope.tag = nfcService.tag;

    // $scope.setLat = function(input){
    //   $scope.latLngList = $filter('testf')(input);
    // };

  //   google.maps.event.addDomListener(window, 'load', function() {
  //      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
   //
  //      var mapOptions = {
  //          center: myLatlng,
  //          zoom: 16,
  //          mapTypeId: google.maps.MapTypeId.ROADMAP
  //      };
   //
  //      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
   //
  //      navigator.geolocation.getCurrentPosition(function(pos) {
  //          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
  //          var myLocation = new google.maps.Marker({
  //              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
  //              map: map,
  //              title: "My Location"
  //          });
  //      });
   //
  //      $scope.map = map;
  //  });

    // google.maps.event.addDomListener(window, 'load', function() {
    //   $ionicLoading.show();
    //     var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
    //
    //     var mapOptions = {
    //         center: myLatlng,
    //         zoom: 16,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //
    //     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //
    //     navigator.geolocation.getCurrentPosition(function(pos) {
    //         map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    //
    //         var myLocation = new google.maps.Marker({
    //             position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
    //             map: map,
    //             title: "My Location"
    //         });
    //     });
    //
    //     $scope.map = map;
    //
    //     //  $ionicLoading.hide();
    // });
    $scope.lat = 10.3000;

    var listener = $rootScope.$on('new.tag', function(event, tag) {
      updateMarkers();
    });

    $scope.$on('$destroy', function(event) {
      listener();
    });

    function updateMarkers() {
      var latLng2 = new   google.maps.LatLng($scope.lat, -100.4833);
      console.log($scope.lat);
      $scope.lat = $scope.lat + 30.3000;

      var markerNfc = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng2
      });

      $scope.map.setCenter(latLng2);
      markerNfc.setMap($scope.map);
    }

    var latLng = new google.maps.LatLng(37.3000, -120.4833);
    //var latLng = new google.maps.LatLng(parseFloat(latLngList[0]), parseFloat(latLngList[1]));
    //alert(latLng);
    var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      google.maps.event.addListener(marker, "click", function(){
          infoWindow.open($scope.map, marker);
      });
    });

})

.controller('placesNearbyCtrl', function($scope, nfcService) {
    $scope.data = {};

    $scope.tag = nfcService.tag();

    $scope.clear = function() {
        nfcService.clearTag();
    };
});

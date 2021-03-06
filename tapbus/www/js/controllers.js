angular.module('app.controllers', [])

.controller('tapBusCtrl', function($scope) {
    $scope.data = {};
})

.controller('mapCtrl', function($scope,
                                $rootScope,
                                $filter,
                                $state,
                                $ionicLoading,
                                nfcService) {

    $scope.tag = nfcService.tag;

    var listener = $rootScope.$on('new.tag', function(event, tag) {
      $ionicLoading.show();
      updateMarkers(tag);
    });

    $scope.$on('$destroy', function(event) {
      listener();
    });

    function updateMarkers(tag) {
      var infowindow;
      var service;
      var latLngList = $filter('testf')(tag.ndefMessage[0]);
      var newLatLng = new google.maps.LatLng(parseFloat(latLngList[0]),
                                          parseFloat(latLngList[1]));

      console.log(latLngList);
      console.log(newLatLng);

      var markerNfc = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: newLatLng
      });

      $scope.map.setCenter(newLatLng);
      markerNfc.setMap($scope.map);
      $ionicLoading.hide();

      var request = {
         location: newLatLng,
         radius: 2500,
         types: ['bus_station']
       };

       infowindow = new google.maps.InfoWindow();
       service = new google.maps.places.PlacesService($scope.map);
       service.search(request, callback);

       function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }

        function createMarker(place) {

          var placeLoc = place.geometry.location;

          var marker = new google.maps.Marker({
            map: $scope.map,
            position: place.geometry.location
          });
          var content='<strong style="font-size:1.2em">'+place.name+'</strong>'+
                      '<br/><strong>Latitude:</strong>'+placeLoc.lat()+
                      '<br/><strong>Longitude:</strong>'+placeLoc.lng();

          //make a request for further details
          service.getDetails({reference:place.reference}, function (place, status)
          {
            if (status == google.maps.places.PlacesServiceStatus.OK)
            {
              more_content='<hr/><strong><a href="'+place.url+'" target="details">Details</a>';

              if(place.website)
              {
                more_content+='<br/><br/><strong><a href="'+place.website+'" target="details">'+place.website+'</a>';
              }
            }
            google.maps.event.addListener(marker, 'click', function() {
             infowindow.setContent(content);
             infowindow.open($scope.map, this);
            });
          });
        }
      }
    }

    var latLng = new google.maps.LatLng(37.3000, -120.4833);

    var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
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

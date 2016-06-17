angular.module('app.services', [])

// nfc service
.factory('nfcService', function($rootScope, $ionicPlatform){
  var tag = {};

  $ionicPlatform.ready(function(){
    nfc.addNdefListener(function(nfcEvent){
      console.log(JSON.stringify(nfcEvent.tag, null, 4));
      $rootScope.$apply(function(){
        angular.copy(nfcEvent.tag, tag);
      });
    }, function () {
      console.log("Listening for NDEF Tags.");
    }, function (reason) {
      alert("Error adding NFC Listener " + reason);
    });
  });

  return {
    tag: tag,
    clearTag: function () {
      angular.copy({}, this.tag);
    }
  };

})

.service('BlankService', [function(){

}]);

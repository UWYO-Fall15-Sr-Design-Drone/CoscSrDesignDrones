angular.module('starter.controllers', ['fsCordova', 'uiGmapgoogle-maps'])

//--------------------------------------------------------
//-------------- Main/Master Controller ------------------
.controller('MainCtrl', function ($scope, $rootScope, $state, $stateParams, $ionicSideMenuDelegate, $ionicHistory) {
    $scope.data = {};
    $scope.cord = {
        lat: 0,
        long: 0
    }
    ///------------------ Navigation Functions ------------------
    $scope.goBack = function () {
        $ionicHistory.goBack();//let ionic do the leg work and take us back.
    }
    $scope.goToAboutPage = function () {
        $state.go('main.aboutPage');
    }
    $scope.clearHistory = function () {
        $ionicHistory.clearHistory();
    }
    ///------------------ End Navigation Functions ------------------

    $scope.numberFormat = function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $scope.pageWidth = function () {
        return window.innerWidth;
    }
    $scope.pageHeight = function () {
        return window.innerHeight;
    }
})
//-------------- Main/Master Controller ------------------

//--------------------------------------------------
//-------------- Page controllers ------------------

.controller('LandingPageCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, myService, CordovaService, secureService, clientService) {
    $scope.goToMappingPage = function () {
        $state.go('main.mappingPage');
    }

})
//})


.controller('MappingPageCtrl', function ($scope, $state, $log, $timeout, $ionicSideMenuDelegate, $cordovaGeolocation, $ionicPopup, uiGmapGoogleMapApi) {

    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    // SIMPLE AND WORKS
    //$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    //uiGmapGoogleMapApi.then(function (maps) {

    //});

    //{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    ///Initial controller load needs to evaluate the local storage.
    $scope.refreshLocation = function () {
        $state.go('main.mappingPage');
    };

    $scope.saveAndFly = function () {


        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="tel" ng-model="data.height">',
            title: 'Height of Drone',
            subTitle: 'What height should the drone fly?',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if (!$scope.data.height) {
                          //don't allow the user to close unless he enters a height
                          e.preventDefault();
                      } else {

                          var myPopupSecondPopup = $ionicPopup.confirm({
                              //template: '<input type="tel" ng-model="data.height">',
                              title: 'Photo Or Vidoe?',
                              template: 'Do you want to take a video recording or photos during this flight?',
                              buttons: [
                                {
                                    text: 'Cancel',
                                    type: 'button   button-full'
                                },
                                {
                                    text: 'Photo ',
                                    type: 'button  button-full button-positive',
                                    onTap: function (e) {

                                        $state.go('main.photoUploadsPage');
                                    }
                                },
                                {
                                    text: 'Video \n',
                                    type: ' button button-full button-royal',
                                    onTap: function (e) {

                                        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
                                        function captureError(e) {
                                            console.log("capture error: " + JSON.stringify(e));
                                        }

                                        function captureSuccess(s) {
                                            console.log("Success");
                                            console.dir(s[0]);
                                            var v = "<video controls='controls'>";
                                            v += "<source src='" + s[0].fullPath + "' type='video/mp4'>";
                                            v += "</video>";
                                            document.querySelector("#videoArea").innerHTML = v;
                                        }
                                        //$state.go('main.photoUploadsPage');
                                    }
                                    
                                },
                              ]
                          });
                      }
                  }
              }
            ]
        });

    };

    ionic.Platform.ready(function () {
        // navigator.geolocation goes here!
        var onSuccess = (function (pos) {

            $scope.cord.lat = pos.coords.latitude;
            $scope.cord.long = pos.coords.longitude;

            $scope.map = { center: { latitude: $scope.cord.lat, longitude: $scope.cord.long }, zoom: 17, bounds: {} };
            //$scope.map = { center: { latitude: 41.31306, longitude: -105.5815 }, zoom: 6 };
            $scope.options = { scrollwheel: false };
            $scope.coordsUpdates = 0;
            $scope.dynamicMoveCtr = 0;
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: $scope.cord.lat,
                    longitude: $scope.cord.long
                },
                options: { draggable: true, icon: 'images/droneIcon _Test.png' },
                events: {
                    dragend: function (marker, eventName, args) {
                        $log.log('marker dragend');
                        var lat = marker.getPosition().lat();
                        var lon = marker.getPosition().lng();
                        $log.log(lat);
                        $log.log(lon);

                        $scope.marker.options = {
                            draggable: true,
                            //labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                            //labelAnchor: "100 0",
                            labelClass: "marker-labels",
                            icon: 'images/droneIcon _Test.png'
                        };
                    }
                }
            };

            $scope.bounds = {
                options: { draggable: true },

                sw: {
                    latitude: $scope.cord.lat - 0.000544,
                    longitude: $scope.cord.long - 0.001219

                },
                ne: {
                    latitude: $scope.cord.lat + 0.000468,
                    longitude: $scope.cord.long + 0.000981

                },
            };
            $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
                if (_.isEqual(newVal, oldVal))
                    return;
                $scope.coordsUpdates++;
            });

            $scope.mapMaker(
                {
                    latitude: $scope.cord.lat + 0.000589,
                    longitude: $scope.cord.long + 0.001066
                },
            $scope.bounds.ne,
            $scope.bounds.sw, {
                latitude: $scope.cord.lat - 0.000628,
                longitude: $scope.cord.long - 0.00098
            }
            )
            //events: {
            //dragend: function (marker, eventName, args) {
            //    $log.log('marker dragend');
            //    var lat = marker.getPosition().lat();
            //    var lon = marker.getPosition().lng();
            //    $log.log(lat);
            //    $log.log(lon);

            //    $scope.marker.options = {
            //        draggable: true,
            //        //labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            //        //labelAnchor: "100 0",
            //        labelClass: "marker-labels",
            //        icon: 'images/droneIcon.png'
            //    };
            //}
            //)

        });
        function onError(error) {
            console.log('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }


        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        //http://www.colorado.edu/geography/gcraft/warmup/aquifer/html/distance.html
        console.log("lat long = " + $scope.cord.lat + " lat  - " + $scope.cord.long + " long.");
    })

    //?WAYPOINT INFORMATION GENERATOR
    //https://forum.ionicframework.com/t/how-to-create-a-csv-file-from-a-json-array/35716/5


    //$scope.Export = app.onSelectExport();

    //$scope.onSelectExport = function() {
    //    cordova.plugins.email.open({
    //        to:      '',
    //        cc:      '',
    //        bcc:     '',
    //        subject: 'Date export '+ $scope.Date.date,
    //        body:    '',
    //        attachments: 'base64:export.csv//'+btoa($scope.Export)
    //    });
    var ConvertToCSV = function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }
        return str;
    };

    $scope.mapMaker = function (P1, P2, P3, P4) {
        // Spacing between each picture
        //Evenly spaced...
        //latitudePicturePoint = (P1.x - P2.x)/P2.x;
        //Every Ten feet
        latitudePicturePoint = 10;

        // Spacing between each row of pictures
        //Evenly spaced... (P1.y - P3.y)/P1.y;
        //Every Ten feet
        longitudeSpacing = 10;

        y = P1.longitude // "Top of Box" or the highest point in the map
        x = P1.latitude // "Farthest Left of Box"
        $scope.pointArray = [{ x, y }]
        for (var i = 0; i <= longitudeSpacing; i++) {
            for (var j = 0; j <= latitudePicturePoint; j++) {
                // Starts in the top left and moves to right side of box
                $scope.pointArray.push({ x: latitudePicturePoint * j, y: y });
                console.log("x = " + x + "y = " + y);
            }
            y = y - longitudeSpacing;
            console.log("x = " + x + "y = " + y);
        }
        //

        ///TODO: Write WAYPOINT FILE
        //window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
        //    console.log("got main dir", dir);
        //    dir.getFile("log.txt", { create: true }, function (file) {
        //        console.log("got the file", file);
        //        logOb = file;
        //        writeLog("App started");
        //    });
        //});

    }

    $ionicSideMenuDelegate.canDragContent(false);

})



.controller('PhotoUploadsPageCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $ionicListDelegate) {

    $scope.images = [];

    $scope.loadImages = function () {
        for (var i = 1; i < 10; i++) {
            str = "images/Icons/vlcsnap-0000" + i.toString() + ".jpg";
            $scope.images.push({ id: i, src: str.toString() });
        }
        for (var i = 10; i < 54; i++) {
            str = "images/Icons/vlcsnap-000" + i.toString() + ".jpg";
            $scope.images.push({ id: i, src: str.toString() });
        }
    }

})


.controller('InfoPageCtrl', function ($scope, $state, $parse, $ionicSideMenuDelegate, $ionicPopup) {

})


.controller('AboutPageCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $cordovaCamera, $CameraPictureBackground) {


    $scope.success = function (url) {
        console.log("Imgurl = " + imgurl);
        //here I added my function to upload the saved pictures
        //on my internet server using file-tranfer plugin
    }

    $scope.onFail = function (message) {
        alert('Failed because: ' + message);
    }

    $scope.CaptureBCK = function () {
        var options = {
            name: "Image", //image suffix
            dirName: "CameraPictureBackground", //foldername
            orientation: "portrait", //or landscape
            type: "back" //or front
        };

        window.plugins.CameraPictureBackground.takePicture(success, onFail, options);
    }


    $scope.takePicture = function () {
        //    $scope.cameraLooper(5);

        //};
        //$scope.cameraLooper = function(numberOfLoops){
        //    var options = {
        //        quality: 50,
        //        destinationType: Camera.DestinationType.DATA_URL,
        //        sourceType: Camera.PictureSourceType.CAMERA,
        //        allowEdit: false,
        //        encodingType: Camera.EncodingType.JPEG,
        //        popoverOptions: CameraPopoverOptions,
        //        saveToPhotoAlbum: true,
        //        correctOrientation: true
        //    };

        //    for (var i = 0; i < numberOfLoops; i++) {

        //        $cordovaCamera.getPicture(options).then(function (imageData) {
        //            var image = document.getElementById('myImage');
        //            image.src = "data:image/jpeg;base64," + imageData;
        //        }, function (err) {
        //             error
        //        });
        //    }
        //};

        ///// CRASHES APP
        var options = {
            name: "Image", //image suffix
            dirName: "CameraPictureBackground", //foldername
            orientation: "portrait", //or landscape
            type: "back" //or front
        };

        window.plugins.CameraPictureBackground.takePicture(success, onFail, options);
        function success(imgurl) {
            console.log("Imgurl = " + imgurl);
            //here I added my function to upload the saved pictures
            //on my internet server using file-tranfer plugin
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };

});

/// Works for user interacting with camera tinking multiple pictures 
////// capture callback
////var captureSuccess = function (mediaFiles) {
////    var i, path, len;
////    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
////        path = mediaFiles[i].fullPath;
////        // do something interesting with the file
////    }
////};

////// capture error callback
////var captureError = function (error) {
////    console.log('Error code: ' + error.code, null, 'Capture Error');
////};

////// start image capture
////navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 50});


//navigator.camera.getPicture( cameraSuccess, cameraError, {
//        quality: 50,
//        destinationType: Camera.DestinationType.FILE_URI,
//        correctOrientation: true,
//        saveToPhotoAlbum: true
//    }); 



//function cameraSuccess(uri) {
//    alert(uri);

//    takePicture();
//}

//function cameraError(message) {
//    alert("Canceled!");
//}

//$scope.takePicture(function(){
//    takePicture();
//});




//-------------- Page controller END ------------------


// For for silly intern. Templates for re-use.
//if (data === true) {
//    $ionicPopup.alert({
//        title: 'Success',
//        template: 'Your photo was successfully uploaded!',
//    });
//} else {
//    $ionicPopup.alert({
//        title: 'Failed',
//        template: 'Unable to upload photo, contact Project Direct Support for more help.'
//    });
//}


// Dynamic cope variables - example found : http://stackoverflow.com/questions/18875486/setting-dynamic-scope-variables-in-angularjs-scope-some-string

//var the_string = 'life.meaning'
//// Get the model
//var model = $parse(the_string)
//// Assigns a value to it
//model.assign($scope, 42);
//// Apply it to the scope
//$scope.$apply();
//console.log($scope.life.meaning);  // logs 42
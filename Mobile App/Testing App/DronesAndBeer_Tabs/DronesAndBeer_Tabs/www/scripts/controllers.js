angular.module('starter.controllers', ['fsCordova'])


.controller('PictureCtrl', function ($scope, $state, $http) {
    $scope.StartPhotoTaking = function () {
        $state.go('photosTaken');
    }
})

.controller('RcCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('PhotosTakenCtrl', function ($scope, $state, $http, $ionicLoading,$ionicHistory, $ionicNavBarDelegate, Camera) {

    $scope.goBack = function () {
        $ionicHistory.goBack();
    }


    $scope.getPhoto = function () {
        console.log('Getting camera');
        Camera.getPicture({
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        }).then(function (imageURI) {
            s
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function (err) {
            console.err(err);
        });

    }

    function capturePhoto() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }

    //Callback function when the picture has been successfully taken
    function onPhotoDataSuccess(imageData) {
        // Get image handle
        var smallImage = document.getElementById('smallImage');

        // Unhide image elements
        smallImage.style.display = 'block';
        smallImage.src = imageData;
    }

    //Callback function when the picture has not been successfully taken
    function onFail(message) {
        alert('Failed to load picture because: ' + message);
    }










    $scope.fetchPhoto = function () {
        //if (!checkProjectSelected()) {
        //    return;
        //}
        var options = {
            quality: 40,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            targetHeight: 1080,
            targetWidth: 1920
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            _onPhotoTaken(imageData);
        }, function (err) {
            //todo: error
        });
    }

    var onCompassSuccess = function (heading) {
        currentHeading = heading;
    }

    var onCompassError = function (error) {
        $ionicPopup.alert({
            title: 'Compass Error',
            template: error.code,
        });
    }

    $scope.takePhoto = function () {
        //if (!checkProjectSelected()) {
        //    return;
        //}
        var options = {
            quality: 40,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetHeight: 1080,
            targetWidth: 1920
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            //prime the compass..for some reason the first hit always returns 0
            $cordovaDeviceOrientation.getCurrentHeading().then(function (hdng) {
                //set a timeout for 1200 ms to give the compass time to get correct heading
                setTimeout(function () {
                    $cordovaDeviceOrientation.getCurrentHeading().then(function (heading) {
                        currentHeading = heading;
                        _onPhotoTaken(imageData);
                    }, function (err) {
                        setTimeout(function () {
                            $ionicPopup.alert({
                                title: 'Compass Error',
                                template: err,
                            });
                            _onPhotoTaken(imageData);
                        }, 0);
                    });
                }, 1200);
            }, function (err) {
                setTimeout(function () {
                    $ionicPopup.alert({
                        title: 'Compass Error',
                        template: err,
                    });
                    _onPhotoTaken(imageData);
                }, 0);
            });
        }, function (err) {
            setTimeout(function () {
                $ionicPopup.alert({
                    title: 'Photo Error',
                    template: 'Error taking photo: ' + err
                });
            }, 0);
        });
    }



    //For sending the photo to the server \\

    //$scope.get_image_size_from_URI = function (imageURI) {
    //    // This function is called once an imageURI is rerturned from PhoneGap's camera or gallery function
    //    window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {
    //        fileEntry.file(function (fileObject) {
    //            // Create a reader to read the file
    //            var reader = new FileReader();

    //            // Create a function to process the file once it's read
    //            reader.onloadend = function (evt) {
    //                // Create an image element that we will load the data into
    //                var image = new Image();
    //                image.onload = function (evt) {
    //                    // The image has been loaded and the data is ready
    //                    originalImgHeight = this.height;
    //                    originalImgWidth = this.width;
    //                    updatePhotoCanvas();
    //                    image = null;
    //                }
    //                // Load the read data into the image source. It's base64 data
    //                image.src = evt.target.result;
    //            }
    //            // Read from disk the data as base64
    //            reader.readAsDataURL(fileObject);
    //        }, function () {
    //            console.log("There was an error reading or processing this file.");
    //        })
    //    })
    //}



    $scope.photoClicked = function (index) {

        var id = $scope.myData.photos[index];
        $scope.myData.selectedPhotoObj = $scope.myData.photos[index];
        $scope.myData.selectedPhotoIndex = index;
        $state.go('main.photoDetailsViewer');
    }


})

.controller('AboutCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };


});

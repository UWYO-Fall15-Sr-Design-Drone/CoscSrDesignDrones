var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {

            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })

    .state('tab.picture', {
        url: '/picture',
        views: {
            'tab-picture': {
                templateUrl: 'templates/tab-picture.html',
                controller: 'PictureCtrl'
            }
        }
    })

    .state('tab.rc', {
        url: '/rc',
        views: {
            'tab-rc': {
                templateUrl: 'templates/tab-rc.html',
                controller: 'RcCtrl'
            }
        }
    })

   .state('photosTaken', {
        url: "/photosTaken",
        templateUrl: "templates/photosTaken.html",
        controller: 'PhotosTakenCtrl'
          })


    .state('tab.about', {
        url: '/about',
        views: {
            'tab-about': {
                templateUrl: 'templates/tab-about.html',
                controller: 'AboutCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/picture');

});


// Jakes Connection String For Ann App
//var serviceURL = "https://pdwcfservicestest.trihydro.com/anniversaryservice/anniversaryservice.svc";

//var loginURL = "https://mobileservicestest.trihydro.com/mobilelogin/mobileloginservice.svc"; //"https://mobileservices.trihydro.com/MobileLogin/MobileLoginService.svc";
//var baseURL = "https://mobileservicestest.trihydro.com/MobilePhoto/PhotoService.svc"; // "http://localhost/JsonMobilePhoto/PhotoService.svc"; // "https://mobileservicestest.trihydro.com/MobilePhoto/PhotoService.svc"; // "http://localhost/JsonMobilePhoto/PhotoService.svc" //"https://mobileservices.trihydro.com/MobilePhoto/PhotoService.svc";//"http://localhost/JsonMobilePhoto/PhotoService.svc";
//var photoUploadURL = "https://mobileservicestest.trihydro.com/MobilePhoto/PhotoUpload.aspx"; //"https://mobileservicestest.trihydro.com/MobilePhoto/PhotoService.svc"; // "https://mobileservices.trihydro.com/MobilePhoto/PhotoUpload.aspx";//"https://mobileservicestest.trihydro.com/MobilePhoto/PhotoUpload.aspx"; 
//// "http://monoservicetest.trihydro.com/MobilePhoto/PhotoUpload.aspx";//"https://mobileservices.trihydro.com/MobilePhoto/PhotoUpload.aspx";
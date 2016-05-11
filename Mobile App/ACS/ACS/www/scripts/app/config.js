var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'uiGmapgoogle-maps'])
.run(function ( $ionicPlatform, $cordovaStatusbar) {

    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            //StatusBar.styleDefault();
            $cordovaStatusbar.overlaysWebView(false)
            $cordovaStatusbar.style(1); //Light
        }

    });


})

.config(function ($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider, uiGmapGoogleMapApiProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
     

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDfhd0DGcIT2fOnwRmxJNcNwtJ3Y5i6K58',
        v: '3.22',
        libraries: 'weather,geometry,visualization'
    })



    $stateProvider

        .state('main', {
            url: "/main",
            abstract: true,
            templateUrl: "templates/main.html",
            controller: "MainCtrl"
        })

        .state('main.landingPage', {
            url: "/landingPage",
            pageTitle: "ACM",
            views: {
                'main-view': {
                    templateUrl: "templates/landingPage.html",
                    controller: 'LandingPageCtrl',
                }
            }
        })

        .state('main.aboutPage', {
            url: "/aboutPage",
            pageTitle: "About",
            views: {
                'main-view': {
                    templateUrl: "templates/aboutPage.html",
                    controller: 'AboutPageCtrl',
                }
            }
        })

            .state('main.infoPage', {
                url: "/infoPage",
                pageTitle: "Info",
                views: {
                    'main-view': {
                        templateUrl: "templates/infoPage.html",
                        controller: 'InfoPageCtrl',
                    }
                }
            })

            .state('main.mappingPage', {
                url: "/mappingPage",
                pageTitle: "Mapping",
                views: {
                    'main-view': {
                        templateUrl: "templates/mappingPage.html",
                        controller: 'MappingPageCtrl',
                    }
                }
            })

            .state('main.photoUploadsPage', {
                url: "/photoUploadsPage",
                pageTitle: "Photo Uploads",
                views: {
                    'main-view': {
                        templateUrl: "templates/photoUploadsPage.html",
                        controller: 'PhotoUploadsPageCtrl',
                    }
                }
            })

 
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main/landingPage');
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);

});

app.run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, current) {
        $rootScope.pageTitle = current.pageTitle;
    })
});

/// Static variables
var secureURL = "https://fencelineProTestSecure.trihydro.com";//Security service
var clientURL = "https://localhost/Trihydro.Service.TriCalClient/api/";//client service
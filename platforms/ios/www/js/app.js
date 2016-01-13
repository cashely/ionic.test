// Ionic Starter App
'use strict'
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function ($rootScope, $location, $cordovaToast, $ionicPlatform, $cordovaStatusbar) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
        //    $cordovaStatusbar.styleColor('red');
        console.log($ionicPlatform);
        $ionicPlatform.registerBackButtonAction(function (e) {
            if ($location.path() == "/index") {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showLongBottom('再按一次退出系统');
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            }
            e.preventDefault();
            return false;
        }, 101);
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'views/index.html',
                controller: function ($scope, $ionicModal) {
                    $scope.sources = ['广州', '安徽', '宿松', '武汉', '南州', '南昌', '江西'];
                    $scope.startStatus = 'start';
                    $scope.city = {};
                    $scope.citys = [];
                    for (var i = 0, t = 0, len = $scope.sources.length; i < len; i++) {
                        if (i % 4 == 0) {
                            t = (i === 0) ? 0 : t + 1;
                            $scope.citys[t] = [];
                        };
                        $scope.citys[t].push($scope.sources[i]);
                    };
                    //    模型窗口-地点选择
                    $ionicModal.fromTemplateUrl('views/city.html', {
                        scope: $scope,
                        animation: 'slide-in-left'
                    }).then(function (modal) {
                        $scope.modal = modal;
                    });
                    $scope.openCityProp = function (status) {
                        $scope.modal.show();
                        $scope.startStatus = status;
                    };
                    $scope.hideCityProp = function () {
                        $scope.modal.hide();
                    };

                    //模型窗口-时间选择
                    $ionicModal.fromTemplateUrl('views/datePicker.html', {
                        scope: $scope,
                        animation: 'slide-in-left'
                    }).then(function (modal) {
                        $scope.modalDate = modal;
                    });
                    $scope.openDateProp = function () {
                        $scope.modalDate.show();
                    }

                    //event


                    //绑定模型事件
                    $scope.pushDate = function (data) {
                        if ($scope.startStatus == 'start') {
                            $scope.city.start = data;
                        } else {
                            $scope.city.end = data;
                        }
                        $scope.modal.hide();
                    }
                }
            });
        $urlRouterProvider.when('', 'index');
    })
    .controller('ControllerDatePicker', function ($scope, $cordovaDatePicker) {
        var options = {
            date: new Date(),
            mode: 'date', // or 'time'
            minDate: new Date() - 10000,
            allowOldDates: true,
            allowFutureDates: false,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
        };
        $scope.data = {
            aa: 'sdsds'
        };
        document.addEventListener("deviceready", function () {

            $cordovaDatePicker.show(options).then(function (date) {
                alert(date);
            });

        }, false);
    })

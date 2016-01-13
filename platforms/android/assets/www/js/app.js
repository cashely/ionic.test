// Ionic Starter App
'use strict'
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ionic-datepicker'])

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

        //        系别全选
        $rootScope.trainType = [];
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'views/index.html',
                controller: function ($scope, $ionicModal, $ionicLoading, $http) {
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
                    };


                    $ionicModal.fromTemplateUrl('views/trainType.html', {
                        scope: $scope,
                        animation: 'slide-in-left'
                    }).then(function (modal) {
                        $scope.trainTypeModal = modal;
                    });

                    $scope.openTrainTypeModal = function () {

                        $http({
                            url: 'http://localhost:8888/json/trainType.json',
                            method: 'POST'
                        }).success(function (data) {
                            console.log(data);
                            $ionicLoading.hide();
                            $scope.trainTypeModal.show();
                            $scope.type = data;
                        }).error(function () {
                            $ionicLoading.show({
                                template: '加载错误！',
                                duration:1000
                            });
                        });

                    }


                    $scope.showAlert = function (index) {
                        $('.tabs-bottom a:eq(' + index + ')').addClass('active').siblings().removeClass('active');
                    }
                }
            })
            .state('list', {
                url: '/list',
                templateUrl: 'views/list.html',
                controller: function ($scope) {

                }
            })
        $urlRouterProvider.when('', 'index');
    })
    .controller('ControllerDatePicker', function ($scope, $rootScope) {
        //    console.log(new Date().toLocaleDateString());
        $rootScope.datepickerObject = {
            titleLabel: '请选择日期', //Optional
            todayLabel: '今天', //Optional
            closeLabel: '关闭', //Optional
            setLabel: '确定', //Optional
            setButtonType: 'button-assertive', //Optional
            todayButtonType: 'button-assertive', //Optional
            closeButtonType: 'button-assertive', //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            disabledDates: [
              new Date(1437719836326),
              new Date(),
              new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
              new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
              new Date("08-14-2015"), //Short format
              new Date(1439676000000) //UNIX format
            ], //Optional
            weekDaysList: ["日", "一", "二", "三", "四", "五", "六"], //Optional
            monthList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], //Optional
            templateType: 'popup', //Optional
            showTodayButton: false, //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive', //Optional
            //            from: new Date(2012, 8, 2), //Optional
            from: new Date(), //Optional
            //            to: new Date(2018, 8, 25), //Optional
            to: new Date(2018, 8, 25), //Optional
            callback: function (val) { //Mandatory
                if (val) {
                    $scope.datepickerObject.inputDate = val;
                }
            },
            dateFormat: 'dd-MM-yyyy', //Optional
            closeOnSelect: true //Optional
        };
        $scope.data = {
            aa: 'sdsds'
        };
        //        window.plugins.calendar.openCalendar();
    })
    .controller('controllerTrainType', function ($scope, $rootScope, $http, $ionicLoading) {
        $scope.hideTrainTypeModal = function () {
            $rootScope.trainType = []; //初始化席别为空
            $('#trainTypeList input:checked').each(function () {
                $rootScope.trainType.push($(this).parents('label').find('span').text());
            });
            $scope.trainTypeModal.hide();
        }

        //$scope.type = ['一等座', '二等座', '硬卧', '软卧'];

        $scope.checkType = function (e) {
            console.log($(e.target).parents('label').prevAll().length);
        }
    })
    .controller('controllerSlider', function ($scope, $ionicSlideBoxDelegate) {
        $scope.toggleSlider = function (index) {
            $ionicSlideBoxDelegate.$getByHandle('index-slider').slide(index, 100)
        }
    })

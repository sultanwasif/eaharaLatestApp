angular.module("eahara")
    .controller("profileController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicActionSheet', 'MainService', '$cordovaSocialSharing', "$cordovaGeolocation",
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicActionSheet, MainService, $cordovaSocialSharing, $cordovaGeolocation) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();
            $scope.basePath = config.basePath;

            $scope.Init = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Address = [];
                $scope.Profile = {};

                MainService.AddressbyCusId($scope.TokenInfo.CustomerId).then(function (response) {
                    $scope.Address = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

                MainService.CustomerById($scope.TokenInfo.CustomerId).then(function (response) {
                    $scope.Profile = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

                $scope.IsUpdate = false;
                $scope.IsAddUpdate = false;

                $scope.CurAddress = {
                    Description: "",
                    Title: "",
                    Location: "",
                    CustomerId: $scope.TokenInfo.CustomerId,
                    Lng: "",
                    Lat: "",
                }

            }
            $scope.Init();


            $scope.InitMap = function () {
                var geocoder;
                var Mylat = 18.1019;
                var Mylong = 78.8521;
                var mapOptions = {
                    center: {
                        lat: Mylat,
                        lng: Mylong
                    },
                    zoom: 13,
                    styles: $scope.mapStyles,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById('booking-sell-delivery-map'), mapOptions);
                var posOptions = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var loc = {};
                        loc.lng = position.coords.longitude;
                        loc.lat = position.coords.latitude;
                        map.setCenter(new google.maps.LatLng(loc.lat, loc.lng));
                        map.setZoom(13);
                        $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
                    }, function (err) {
                        // error
                        map.setCenter(new google.maps.LatLng(Mylat, Mylong));
                        $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
                        console.log("err");
                    });
                google.maps.event.addListener(map, 'center_changed', function () {
                    $scope.CurAddress.Lat = map.getCenter().lat();
                    $scope.CurAddress.Lng = map.getCenter().lng();
                    geocodePosition(map.getCenter());
                });
                geocoder = new google.maps.Geocoder();
                var input = (document.getElementById('booking-sell-delivery-input'));
                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', map);

                $scope.disableTap = function () {
                    var container = document.getElementsByClassName('pac-container');
                    angular.element(container).attr('data-tap-disabled', 'true');
                    var backdrop = document.getElementsByClassName('backdrop');
                    angular.element(backdrop).attr('data-tap-disabled', 'true');
                    angular.element(container).on("click", function () {
                        document.getElementById('booking-sell-delivery-input').blur();
                    });
                };


                function geocodePosition(pos) {
                    geocoder.geocode({
                        latLng: pos
                    }, function (responses) {
                        if (responses && responses.length > 0) {
                            console.log(responses[0].formatted_address);
                            $scope.$apply(function () {
                                console.log(responses[0]);
                                document.getElementById('booking-sell-delivery-input').value = responses[0].formatted_address;
                                // $scope.Booking.Address = responses[0].formatted_address;
                            });
                        } else {
                            console.log('Cannot determine address at this location.');
                        }
                    });
                }


                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    var place = autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(15);
                    }
                    console.log(place.formatted_address);


                    google.maps.event.addListener(map, 'center_changed', function () {
                        $scope.CurAddress.Lat = map.getCenter().lat();
                        $scope.CurAddress.Lng = map.getCenter().lng();
                        geocodePosition(map.getCenter());
                    });
                    $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
                });
            }

            $scope.InitMap();

            $scope.updateClick = function () {
                $scope.IsUpdate = true;
            }

            $scope.AddupdateClick = function () {
                $scope.IsAddUpdate = !$scope.IsAddUpdate;
            }

            $scope.UpdateAddress = function (data) {

                $scope.CurAddress = data;
                $scope.IsAddUpdate = false;
                var loc = {};
                loc.lng = parseFloat(data.Lng);
                loc.lat = parseFloat(data.Lat);

                var geocoder;
                var Mylat = 18.1019;
                var Mylong = 78.8521;
                var mapOptions = {
                    center: {
                        lat: loc.lat,
                        lng: loc.lng
                    },
                    zoom: 13,
                    styles: $scope.mapStyles,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById('booking-sell-delivery-map'), mapOptions);

                map.setCenter(new google.maps.LatLng(loc.lat, loc.lng));
                map.setZoom(13);
                $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
            }

            $scope.SaveProfile = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.updateCustomer($scope.Profile).then(function (response) {
                    if (response) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $scope.Init();
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })
            }

            $scope.saveAddress = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                if ($scope.CurAddress.Title == "") {
                    toastr.warning("Enter Title");
                } else if ($scope.CurAddress.Description == "") {
                    toastr.warning("Enter Address");
                } else {
                    $scope.CurAddress.CustomerId = $scope.TokenInfo.CustomerId;
                    MainService.AddAddress($scope.CurAddress).then(function (response) {
                        if (response) {
                            ionicToast.show('Success', 'bottom', false, 2500);
                            $scope.Init();
                        }
                        $ionicLoading.hide();

                    }, function () {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                    })
                }

            }


    }]);

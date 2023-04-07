angular.module("eahara")
    .controller("checkoutController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicActionSheet', 'MainService', '$cordovaSocialSharing', "$cordovaGeolocation",
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicActionSheet, MainService, $cordovaSocialSharing, $cordovaGeolocation) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();
            $scope.basePath = config.basePath;

            $scope.mycartinit = function () {
                $scope.ordersToCheckout = [];
                var cart = AuthenticationService.getCart();
                if (cart != null && cart.length > 0) {
                    $scope.ordersToCheckout = cart;

                    $scope.Total = 0;
                    $scope.SubTotal = 0;
                    $scope.TotalDeliveryCharge = 0;
                    $scope.WalletCash = 0;

                    angular.forEach($scope.ordersToCheckout, function (e) {
                        if (e != null) {
                            $scope.SubTotal = $scope.SubTotal + (e.Quantity * e.DiscountPrice);
                            $scope.TotalDeliveryCharge = e.DelCharge;
                            $scope.SubTotal = Math.round($scope.SubTotal * 100) / 100;

                            $scope.Total = ($scope.TotalDeliveryCharge + $scope.SubTotal) - $scope.WalletCash;

                            $scope.SelectedShopId = e.ShopId;
                        }
                    });

                }
            }
            $scope.mycartinit();

            $scope.Init = function () {


                $scope.Booking = {
                    Description: "",
                    Remarks: "",
                    Time: "",
                    Name: "",
                    MobileNo: "",
                    EmailId: "",
                    Address: "",
                    Lat: 18.1019,
                    Lng: 78.8521,
                    Code: "",
                    LocationId: $scope.LocInfo.LocationId,
                    IsOffer: false,
                    AddressId: 0,
                    OrderDate: new Date(),
                }

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Address = [];
                $scope.Customer = {};
                if ($scope.IsLoggedIn == true) {
                    MainService.AddressbyCusId($scope.TokenInfo.CustomerId).then(function (response) {
                        $scope.Address = response.data;
                    })

                    MainService.CustomerById($scope.TokenInfo.CustomerId).then(function (response) {
                        $scope.Customer = response.data;
                    })
                }


                $scope.Locations = [];
                MainService.LocationInDropdown().then(function (response) {
                    $scope.Locations = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                });

                $scope.ViewAdd = 0;
            }
            $scope.Init();

            $scope.ShowAddress = function () {
                $scope.ViewAdd = 1;
            }

            $scope.SelectAddress = function (data) {
                $scope.ViewAdd = 0;
                $scope.Booking.AddressId = data.Id;
                $scope.Booking.Address = data.Description;
                $scope.Booking.Location = data.Location;

                var loc = {};
                loc.lng = parseFloat(data.Lng);
                loc.lat = parseFloat(data.Lat);


            }


            //            $scope.SelectAddress = function (data) {
            //                $scope.ViewAdd = 0;
            //                $scope.Booking.AddressId = data.Id;
            //                $scope.Booking.Address = data.Description;
            //                $scope.Booking.Location = data.Location;
            //
            //                var loc = {};
            //                loc.lng = parseFloat(data.Lng);
            //                loc.lat = parseFloat(data.Lat);
            //
            //                var geocoder;
            //                var Mylat = 18.1019;
            //                var Mylong = 78.8521;
            //                var mapOptions = {
            //                    center: {
            //                        lat: loc.lat,
            //                        lng: loc.lng
            //                    },
            //                    enableHighAccuracy: true,
            //                    zoom: 13,
            //                    styles: $scope.mapStyles,
            //                    scrollwheel: false,
            //                    mapTypeId: google.maps.MapTypeId.ROADMAP
            //                };
            //                var map = new google.maps.Map(document.getElementById('booking-sell-delivery-map'), mapOptions);
            //
            //                map.setCenter(new google.maps.LatLng(loc.lat, loc.lng));
            //                map.setZoom(13);
            //                $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
            //                $scope.search = data.Description;
            //            }
            //
            //            $scope.InitMap = function () {
            //                var geocoder;
            //                var Mylat = 18.1019;
            //                var Mylong = 78.8521;
            //                var mapOptions = {
            //                    center: {
            //                        lat: Mylat,
            //                        lng: Mylong
            //                    },
            //                    zoom: 13,
            //                    styles: $scope.mapStyles,
            //                    scrollwheel: false,
            //                    mapTypeId: google.maps.MapTypeId.ROADMAP
            //                };
            //                var map = new google.maps.Map(document.getElementById('booking-sell-delivery-map'), mapOptions);
            //                var posOptions = {
            //                    timeout: 10000,
            //                    enableHighAccuracy: false
            //                };
            //                $cordovaGeolocation
            //                    .getCurrentPosition(posOptions)
            //                    .then(function (position) {
            //                        var loc = {};
            //                        loc.lng = position.coords.longitude;
            //                        loc.lat = position.coords.latitude;
            //                        map.setCenter(new google.maps.LatLng(loc.lat, loc.lng));
            //                        map.setZoom(13);
            //                        $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
            //                    }, function (err) {
            //                        // error
            //                        map.setCenter(new google.maps.LatLng(Mylat, Mylong));
            //                        $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
            //                        console.log("err");
            //                    });
            //                google.maps.event.addListener(map, 'center_changed', function () {
            //                    $scope.Booking.Lat = map.getCenter().lat();
            //                    $scope.Booking.Lng = map.getCenter().lng();
            //                    geocodePosition(map.getCenter());
            //                });
            //                geocoder = new google.maps.Geocoder();
            //                var input = (document.getElementById('booking-sell-delivery-input'));
            //                var autocomplete = new google.maps.places.Autocomplete(input);
            //                autocomplete.bindTo('bounds', map);
            //
            //                $scope.disableTap = function () {
            //                    var container = document.getElementsByClassName('pac-container');
            //                    angular.element(container).attr('data-tap-disabled', 'true');
            //                    var backdrop = document.getElementsByClassName('backdrop');
            //                    angular.element(backdrop).attr('data-tap-disabled', 'true');
            //                    angular.element(container).on("click", function () {
            //                        document.getElementById('booking-sell-delivery-input').blur();
            //                    });
            //                };
            //
            //
            //                function geocodePosition(pos) {
            //                    geocoder.geocode({
            //                        latLng: pos
            //                    }, function (responses) {
            //                        if (responses && responses.length > 0) {
            //                            console.log(responses[0].formatted_address);
            //                            $scope.$apply(function () {
            //                                console.log(responses[0]);
            //                                document.getElementById('booking-sell-delivery-input').value = responses[0].formatted_address;
            //                                $scope.Booking.Address = responses[0].formatted_address;
            //                            });
            //                        } else {
            //                            console.log('Cannot determine address at this location.');
            //                        }
            //                    });
            //                }
            //
            //
            //                google.maps.event.addListener(autocomplete, 'place_changed', function () {
            //                    var place = autocomplete.getPlace();
            //                    if (!place.geometry) {
            //                        return;
            //                    }
            //                    if (place.geometry.viewport) {
            //                        map.fitBounds(place.geometry.viewport);
            //                    } else {
            //                        map.setCenter(place.geometry.location);
            //                        map.setZoom(15);
            //                    }
            //                    console.log(place.formatted_address);
            //
            //
            //                    google.maps.event.addListener(map, 'center_changed', function () {
            //                        $scope.Booking.Lat = map.getCenter().lat();
            //                        $scope.Booking.Lng = map.getCenter().lng();
            //                        geocodePosition(map.getCenter());
            //                    });
            //                    $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
            //                });
            //            }
            //
            //            $scope.InitMap();




            $scope.PlaceOrder = function () {

                if ($scope.Booking.Name == "" && $scope.IsLoggedIn == false) {
                    ionicToast.show('Enter Name', 'bottom', false, 2500);
                } else if ($scope.Booking.MobileNo == "" && $scope.IsLoggedIn == false) {
                    ionicToast.show('Enter Mobile No', 'bottom', false, 2500);
                } else if ($scope.Booking.MobileNo.toString().length != 10 && $scope.IsLoggedIn == false) {
                    ionicToast.show('Enter Valid Mobile No', 'bottom', false, 2500);
                } else if ($scope.Booking.Address == "") {
                    ionicToast.show('Enter Address', 'bottom', false, 2500);
                } else {
                    $ionicActionSheet.show({
                        titleText: 'Confirm Place Order',
                        buttons: [
                            {
                                text: '<i class="icon ion-heart"></i> Confirm'
                        },
                    ],
                        destructiveText: 'Cancel',
                        cancelText: 'Cancel',
                        cancel: function () {
                            console.log('CANCELLED');
                        },
                        buttonClicked: function (index) {
                            if (index == 0) {
                                $scope.PlaceYourOrder();
                            }
                            return true;
                        },
                        destructiveButtonClicked: function () {
                            return true;
                        }
                    });
                }

            }

            $scope.PlaceYourOrder = function () {

                $scope.Booking.BookingDetails = [];

                angular.forEach($scope.ordersToCheckout, function (e) {
                    var data = {
                        Quantity: e.Quantity,
                        Price: e.Price,
                        TotalPrice: (e.DiscountPrice * e.Quantity),
                        DiscountPrice: e.DiscountPrice,
                        DelCharge: e.DelCharge,
                        ItemId: e.Id,
                        ShopId: e.ShopId
                    }
                    $scope.Booking.BookingDetails.push(data);
                });

                $scope.Booking.Total = $scope.Total;
                $scope.Booking.ShopId = $scope.SelectedShopId;
                $scope.Booking.TotalDeliveryCharge = $scope.TotalDeliveryCharge;
                $scope.Booking.SubTotal = $scope.SubTotal;
                $scope.Booking.WalletCash = $scope.WalletCash;
                if ($scope.Booking.PromoOfferId > 0) {
                    $scope.Booking.PromoOfferPrice = $scope.Total2 - $scope.SubTotal;
                }

                if ($scope.IsLoggedIn == true) {
                    $scope.Booking.CustomerId = $scope.TokenInfo.CustomerId;
                }


                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Booking.Month = $scope.Booking.OrderDate.getMonth() + 1;
                $scope.Booking.Day = $scope.Booking.OrderDate.getDate();
                $scope.Booking.Year = $scope.Booking.OrderDate.getFullYear();
                $scope.Booking.Hour = $scope.Booking.OrderDate.getHours();
                $scope.Booking.Minutes = $scope.Booking.OrderDate.getMinutes();


                MainService.AddBooking($scope.Booking).then(function (response) {
                    if (response.data.Id > 0) {
                        ionicToast.show('Booking Successfully Added With Referance No : ' + response.data.RefNo, 'bottom', false, 2500);
                        $scope.ordersToCheckout = [];
                        AuthenticationService.setCart($scope.ordersToCheckout);
                        $scope.InitCart();
                        $scope.mycartinit();
                        $state.go('home');
                    } else if (response.data.Id == -1) {
                        ionicToast.show(response.data.Description, 'bottom', false, 2500);
                    } else {
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }

            $scope.ApplyOffer = function () {

                $scope.Offer.IsSelected = true;
                $scope.Booking.PromoOfferId = $scope.Offer.Id;

                $scope.Total = 0;
                $scope.SubTotal = 0;
                $scope.TotalDeliveryCharge = 0;
                angular.forEach($scope.ordersToCheckout, function (e) {
                    $scope.SubTotal = $scope.SubTotal + (e.Quantity * e.DiscountPrice);
                    $scope.TotalDeliveryCharge = e.DelCharge;
                    $scope.SubTotal = Math.round($scope.SubTotal * 100) / 100;

                    $scope.Total = ($scope.TotalDeliveryCharge + $scope.SubTotal) - $scope.WalletCash;

                    $scope.SelectedShopId = e.ShopId;
                });

                $scope.Total2 = angular.copy($scope.SubTotal);
                if ($scope.Offer.IsPercentage) {
                    var offervalue = ($scope.SubTotal * $scope.Offer.Value) / 100;
                    if (offervalue > $scope.Offer.MaxValue) {
                        offervalue = $scope.Offer.MaxValue;
                    }
                    var price = $scope.SubTotal - offervalue;
                    price = Math.round(price * 100) / 100;
                    $scope.SubTotal = price;
                    $scope.Total = ($scope.TotalDeliveryCharge + $scope.SubTotal) - $scope.WalletCash;
                } else {
                    if ($scope.Offer.Value > $scope.Offer.MaxValue) {
                        $scope.Offer.Value = $scope.Offer.MaxValue;
                    }
                    $scope.SubTotal = $scope.SubTotal - $scope.Offer.Value;
                    $scope.Total = ($scope.TotalDeliveryCharge + $scope.SubTotal) - $scope.WalletCash;
                }

            }

            $scope.checkCode = function () {
                if ($scope.Booking.Code == "") {
                    ionicToast.show("Invalid Code !", 'bottom', false, 1500);
                } else {
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    $scope.Booking.IsOffer = false;
                    MainService.CheckPromoOffersByCusId($scope.Booking.Code, $scope.TokenInfo.CustomerId).then(function (response) {
                            if (response.data != null) {
                                if (response.data.Id > 0) {

                                    //                                    if ($scope.Total <= response.data.MaxValue) {
                                    //                                        
                                    //                                    } else {
                                    //                                        ionicToast.show("To Avail Promo-Discount, Make order Below * " + response.data.MaxValue, 'bottom', false, 2500);
                                    //                                    }

                                    ionicToast.show("Offer Applied !", 'bottom', false, 2500);
                                    $scope.Offer = response.data;
                                    $scope.Booking.IsOffer = true;
                                    $scope.ApplyOffer();

                                } else {
                                    ionicToast.show("Promo code has already been availed", 'bottom', false, 2500);
                                }
                            } else {
                                ionicToast.show("Invalid Promo Code, please enter correct code to avail discount.", 'bottom', false, 2500);
                            }
                            $ionicLoading.hide();
                        },
                        function (err) {
                            $ionicLoading.hide();
                        });
                }
            }

            $scope.RemoveOffer = function () {
                $scope.Total = 0;
                $scope.SubTotal = 0;
                $scope.TotalDeliveryCharge = 0;
                angular.forEach($scope.ordersToCheckout, function (e) {
                    $scope.SubTotal = $scope.SubTotal + (e.Quantity * e.DiscountPrice);
                    $scope.TotalDeliveryCharge = e.DelCharge;
                    $scope.SubTotal = Math.round($scope.SubTotal * 100) / 100;

                    $scope.Total = ($scope.TotalDeliveryCharge + $scope.SubTotal) - $scope.WalletCash;

                    $scope.SelectedShopId = e.ShopId;
                });


                $scope.Total2 = angular.copy($scope.SubTotal);
                $scope.Booking.IsOffer = false;
                $scope.Booking.PromoOfferId = "";
                $scope.Booking.Code = "";

            }

            $scope.UseWallet = function () {
                var pts = 0;
                if ($scope.Customer.Points >= $scope.CompanyProfile.WalletLimit) {
                    pts = $scope.CompanyProfile.WalletLimit
                } else {
                    pts = $scope.Customer.Points;
                }
                $scope.WalletCash = pts;
                $scope.Total = ($scope.TotalDeliveryCharge + $scope.SubTotal) - $scope.WalletCash;
            }


                }]);

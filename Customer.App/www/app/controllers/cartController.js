angular.module("eahara")
    .controller("cartController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$stateParams', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $stateParams, MainService, $cordovaSocialSharing) {



            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $scope.basePath = config.basePath;

            $scope.init = function () {
                $scope.ViewCheckoutPage = 0;

                if ($scope.Shop.AverageCost <= ($scope.Total - $scope.TotalDeliveryCharge)) {
                    $scope.ViewCheckoutPage = 1;
                }
            }


            $scope.mycartinit = function () {

                $scope.now = new Date();
                $scope.Time = $scope.now.getHours();
                $scope.Minutes = $scope.now.getMinutes();
                $scope.CurrentTime = $scope.Time + "." + $scope.Minutes;
                $scope.CurrentTime = parseFloat($scope.CurrentTime);

                $scope.ordersToCheckout = [];
                $scope.Total = 0;
                $scope.SubTotal = 0;
                $scope.TotalDeliveryCharge = 0;
                var cart = AuthenticationService.getCart();
                if (cart != null && cart.length > 0) {
                    $scope.ordersToCheckout = cart;

                    if ($scope.ordersToCheckout.length > 0) {
                        MainService.GetShopInCart($scope.ordersToCheckout[0].ShopId).then(function (response) {
                            if (response.data != null) {
                                var Shop = response.data;
                                if (Shop.StartTime > $scope.CurrentTime || Shop.EndTime < $scope.CurrentTime) {
                                    ionicToast.show('Shop Closed Cannot Process Now. Please Try Another Shop', 'bottom', false, 1500);
                                    var ordersToCheckout = [];
                                    AuthenticationService.setCart(ordersToCheckout);
                                    $scope.InitCart();
                                    $state.go("home");
                                }
                            } else {
                                ionicToast.show('Shop Closed Cannot Process Now. Please Try Another Shop', 'bottom', false, 1500);
                                var ordersToCheckout = [];
                                AuthenticationService.setCart(ordersToCheckout);
                                $scope.InitCart();
                                $state.go("home");
                            }
                        }, function () {
                            toastr.error("Network Error");
                        })
                    }


                    angular.forEach($scope.ordersToCheckout, function (e) {
                        if (e != null) {

                            MainService.GetItemInCart(e.Id).then(function (response) {
                                if (response.data != null) {
                                    var item = response.data;
                                    if (item.InActive == true) {
                                        ionicToast.show("Item " + e.Name + " Not Available", 'bottom', false, 1500);


                                        var index = $scope.ordersToCheckout.indexOf(e);
                                        $scope.ordersToCheckout.splice(index, 1);
                                        AuthenticationService.setCart($scope.ordersToCheckout);
                                        $scope.InitCart();
                                        $scope.mycartinit();

                                    } else {

                                        e.DiscountPrice = item.OfferPrice;
                                        e.Price = item.Price;

                                    }
                                } else {
                                    ionicToast.show("Item " + e.Name + " Not Available", 'bottom', false, 1500);

                                    var index = $scope.ordersToCheckout.indexOf(e);
                                    $scope.ordersToCheckout.splice(index, 1);
                                    AuthenticationService.setCart($scope.ordersToCheckout);
                                    $scope.InitCart();
                                    $scope.mycartinit();
                                }
                            }, function () {
                                toastr.error("Network Error");
                            })

                            //                            $scope.SubTotal = $scope.SubTotal + (e.Quantity * e.DiscountPrice);
                            //                            $scope.TotalDeliveryCharge = e.DelCharge;
                            //                            $scope.SubTotal = Math.round($scope.SubTotal * 100) / 100;
                            //
                            //                            $scope.Total = $scope.TotalDeliveryCharge + $scope.SubTotal;

                            $scope.SelectedShopId = e.ShopId;
                        }
                    });

                    $scope.Total = 0;
                    $scope.TotalDeliveryCharge = 0;
                    $scope.SubTotal = 0;

                    angular.forEach($scope.ordersToCheckout, function (e) {
                        $scope.SubTotal = $scope.SubTotal + (e.Quantity * e.DiscountPrice);
                        $scope.TotalDeliveryCharge = e.DelCharge;
                        $scope.SubTotal = Math.round($scope.SubTotal * 100) / 100;
                        $scope.Total = $scope.TotalDeliveryCharge + $scope.SubTotal;
                    });

                    $scope.Shop = {};
                    MainService.ShopDetailById($scope.SelectedShopId).then(function (res) {
                        $scope.Shop = res.data;
                        $scope.init();
                    }, function (err) {
                        // $scope.GetShopItemsHavingOffer();
                    });

                }
            }
            $scope.mycartinit();

            $scope.dcrQty = function (data) {
                if (data.Quantity - 1 != 0) {
                    data.Quantity = data.Quantity - 1;
                    $scope.updateCart();
                }
            }

            $scope.incrQty = function (data) {
                data.Quantity = data.Quantity + 1;
                $scope.updateCart();
            }

            $scope.updateCart = function () {
                AuthenticationService.setCart($scope.ordersToCheckout);
                $scope.mycartinit();
            }

            $scope.removeCart = function (data) {

                angular.forEach($scope.ordersToCheckout, function (e) {
                    if (data == null) {
                        var index = $scope.ordersToCheckout.indexOf(e);
                        $scope.ordersToCheckout.splice(index, 1);
                        $scope.MyCart.length = $scope.ordersToCheckout.length;
                    } else
                    if (e.Id == data.Id) {
                        var index = $scope.ordersToCheckout.indexOf(data);
                        $scope.ordersToCheckout.splice(index, 1);
                        $scope.MyCart.length = $scope.ordersToCheckout.length;
                    }

                });

                $scope.updateCart();
                $scope.InitCart();
                $scope.mycartinit();
            }

            $scope.viewFromCart = function (data) {
                $state.go('packagesDetail', {
                    PackageId: data.Id
                });
            }

    }]);

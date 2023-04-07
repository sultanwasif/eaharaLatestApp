angular.module("eahara")
    .controller("restaurantDetailController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicSlideBoxDelegate', '$interval', 'MainService', '$stateParams',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicSlideBoxDelegate, $interval, MainService, $stateParams) {

            $ionicSlideBoxDelegate.update();

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $scope.Init = function () {

                $scope.basePath = config.basePath;

                $scope.Shop = {};
                $scope.ViewVal = 0;
                $scope.ItemCats = {};
                $scope.filter = {
                    CategoryId: 0,
                };
                $scope.Items = [];
                $scope.Reviews = [];

                if ($stateParams.RestaurantId != null) {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    MainService.ShopDetailById($stateParams.RestaurantId).then(function (res) {
                        $scope.Shop = res.data;
                        // GetShopItemsByShopId
                        MainService.getShopItemsForFirstLoad($scope.Shop.Id).then(function (res) {
                            $scope.Items = res.data;
                        }, function (err) {
                            //$scope.GetShopItemsHavingOffer();
                        });

                        MainService.getShopItemCats($scope.Shop.Id).then(function (res) {
                            $scope.ItemCats = res.data;
                            //$scope.GetShopItemsHavingOffer();
                        }, function (err) {
                            //$scope.GetShopItemsHavingOffer();
                        });

                        MainService.getShopReviews($scope.Shop.Id).then(function (res) {
                            $scope.Reviews = res.data;
                        })

                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });

                }

                $scope.Review = {
                    Description: "",
                    Name: "",
                    MobileNo: "",
                    EmailId: "",
                    Rating: 0,
                }

                $scope.now = new Date();
                $scope.Time = $scope.now.getHours();
                $scope.Minutes = $scope.now.getMinutes();
                $scope.CurrentTime = $scope.Time + "." + $scope.Minutes;
                $scope.CurrentTime = parseFloat($scope.CurrentTime);

            }
            $scope.Init();

            $scope.GetAllItems = function () {
                $scope.Items = [];

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                //GetShopItemsByShopId
                MainService.getShopItemsForFirstLoad($scope.Shop.Id).then(function (response) {
                    if (response) {
                        $ionicLoading.hide();
                        $scope.Items = response.data;
                    } else {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                    }
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });
            }


            $scope.GetShopItemsHavingOffer = function () {
                $scope.Items = [];

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });


                MainService.GetShopItemsHavingOffer($scope.Shop.Id).then(function (response) {
                    if (response) {
                        $ionicLoading.hide();
                        var item = {
                            Name: "Todays Offers",
                            Items: response.data
                        }
                        $scope.Items.push(item);
                        if ($scope.Items.length <= 0) {
                            ionicToast.show("Currently No Offers Available On " + $scope.Shop.Name, 'bottom', false, 1500);
                            if ($scope.ItemCats.length > 0) {
                                $scope.filter.CategoryId = $scope.ItemCats[0].Id;
                                $scope.GetShopCatItems();
                            }
                        }
                    } else {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                    }
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });
            }

            $scope.GetShopCatItems = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Items = [];

                MainService.GetShopCatItems($scope.Shop.Id, $scope.filter.CategoryId).then(function (response) {
                    if (response) {
                        var cat = "";
                        angular.forEach($scope.ItemCats, function (e) {
                            if (e.Id == $scope.filter.CategoryId) {
                                cat = e.Name;
                            }
                        });

                        $ionicLoading.hide();
                        var item = {
                            Name: cat,
                            Items: response.data
                        }
                        $scope.Items.push(item);
                    } else {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                    }
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });
            }

            $scope.incrQty = function (data) {
                data.Quantity = data.Quantity + 1;
            }

            $scope.dcrQty = function (data) {
                if (data.Quantity - 1 != 0) {
                    data.Quantity = data.Quantity - 1;
                }
            }


            $scope.mycartinit = function () {
                $scope.ordersToCheckout = [];
                var cart = AuthenticationService.getCart();
                if (cart != null && cart.length > 0) {
                    $scope.ordersToCheckout = cart;
                    angular.forEach($scope.ordersToCheckout, function (e) {
                        $scope.SelectedShopId = e.ShopId;
                    });
                }
            }
            $scope.mycartinit();


            $scope.AddReview = function () {

                if ($scope.Review.Name == "") {
                    ionicToast.show('Enter Name', 'bottom', false, 1500);
                } else if ($scope.Review.MobileNo == "") {
                    ionicToast.show('Enter Mobile No', 'bottom', false, 1500);
                } else if ($scope.Review.Rating == 0) {
                    ionicToast.show('Give Rating', 'bottom', false, 1500);
                } else if ($scope.Review.Description == "") {
                    ionicToast.show('Enter Review', 'bottom', false, 1500);
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    $scope.Review.ShopId = $scope.Shop.Id;
                    MainService.AddReview($scope.Review).then(function (response) {
                        if (response) {
                            ionicToast.show('Thanks for your review', 'bottom', false, 1500);
                            $ionicLoading.hide();
                            $scope.Review = {
                                Description: "",
                                Name: "",
                                MobileNo: "",
                                EmailId: "",
                                Rating: 0,
                            }
                        } else {
                            $ionicLoading.hide();
                            ionicToast.show('Error', 'bottom', false, 1500);
                        }
                    }, function (err) {
                        ionicToast.show('Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });
                }
            }




            $scope.AddToCart = function (item) {

                if ($scope.Shop.StartTime > $scope.CurrentTime || $scope.Shop.EndTime < $scope.CurrentTime) {
                    ionicToast.show('Shop Closed Cannot Process Now', 'bottom', false, 2500);
                } else if ($scope.Shop.Id != $scope.SelectedShopId && $scope.ordersToCheckout.length > 0) {
                    ionicToast.show('To add items from another retsurant first complete this order and make a another order from the required resturant   * you cannot add items from multiple resturants in single order*', 'bottom', false, 2500);
                } else if (item.InActive == true) {
                    ionicToast.show('Sorry Item Not Available Now ! ', 'bottom', false, 2500);
                } else {

                    $scope.ToCart = {
                        Id: item.Id,
                        ShopId: $scope.Shop.Id,
                        Shop: $scope.Shop.Name,
                        Name: item.Name,
                        Price: item.Price,
                        DiscountPrice: item.OfferPrice,
                        DelCharge: $scope.Shop.DeliveryCharge,
                        Image: item.Image,
                        Quantity: item.Quantity,
                    }

                    $scope.isThere = false;
                    angular.forEach($scope.ordersToCheckout, function (e) {
                        if (e.Id == item.Id) {
                            $scope.isThere = true;
                            e.Quantity = e.Quantity + item.Quantity;
                            e.Price = item.Price;
                            e.DiscountPrice = item.OfferPrice;
                        }
                    });

                    if ($scope.isThere == false) {
                        $scope.ordersToCheckout.push($scope.ToCart);
                    }

                    AuthenticationService.setCart($scope.ordersToCheckout);
                    $scope.InitCart();
                    $scope.mycartinit();

                    ionicToast.show('Successfully Added to Cart', 'bottom', false, 2500);
                }


            }


                }]);
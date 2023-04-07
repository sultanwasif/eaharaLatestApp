angular.module("eahara")
    .controller("itemsDetailController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicSlideBoxDelegate', '$interval', 'MainService', '$stateParams',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicSlideBoxDelegate, $interval, MainService, $stateParams) {

            $ionicSlideBoxDelegate.update();

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $scope.Init = function () {

                $scope.basePath = config.basePath;

                $scope.now = new Date();
                $scope.Time = $scope.now.getHours();
                $scope.Minutes = $scope.now.getMinutes();
                $scope.CurrentTime = $scope.Time + "." + $scope.Minutes;
                $scope.CurrentTime = parseFloat($scope.CurrentTime);

                $scope.Item = {};

                if ($stateParams.ItemId != null) {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    MainService.ItemDetailById($stateParams.ItemId).then(function (res) {
                        $scope.Item = res.data;
                        $scope.Item.Quantity = 1;
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });

                }

            }
            $scope.Init();


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

            $scope.incrQty = function () {
                $scope.Item.Quantity = $scope.Item.Quantity + 1;
            }

            $scope.dcrQty = function () {
                if ($scope.Item.Quantity - 1 != 0) {
                    $scope.Item.Quantity = $scope.Item.Quantity - 1;
                }
            }




            $scope.AddToCart = function () {

                if ($scope.Item.Shop.StartTime > $scope.CurrentTime || $scope.Item.Shop.EndTime < $scope.CurrentTime) {
                    ionicToast.show('Shop Closed Cannot Process Now', 'bottom', false, 2500);
                } else if ($scope.Item.ShopId != $scope.SelectedShopId && $scope.ordersToCheckout.length > 0) {
                    ionicToast.show('To add items from another retsurant first complete this order and make a another order from the required resturant   * you cannot add items from multiple resturants in single order*', 'bottom', false, 2500);
                } else if ($scope.Item.InActive == true) {
                    ionicToast.show('Sorry Item Not Available Now ! ', 'bottom', false, 2500);
                } else {

                    $scope.ToCart = {
                        Id: $scope.Item.Id,
                        ShopId: $scope.Item.ShopId,
                        Shop: $scope.Item.Shop.Name,
                        Name: $scope.Item.Name,
                        Price: $scope.Item.Price,
                        DiscountPrice: $scope.Item.OfferPrice,
                        DelCharge: $scope.Item.Shop.DeliveryCharge,
                        Image: $scope.Item.Image,
                        Quantity: $scope.Item.Quantity,
                    }

                    $scope.isThere = false;
                    angular.forEach($scope.ordersToCheckout, function (e) {
                        if (e.Id == $scope.Item.Id) {
                            $scope.isThere = true;
                            e.Quantity = e.Quantity + $scope.Item.Quantity;
                            e.Price = $scope.Item.Price;
                            e.Price = $scope.Item.OfferPrice;
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

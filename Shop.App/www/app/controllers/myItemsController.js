angular.module("eahara")
    .controller("myItemsController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaCamera', '$ionicActionSheet',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaCamera, $ionicActionSheet) {

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

                $scope.Items = [];
                MainService.GetShopItemsByShopId($scope.TokenInfo.ShopId).then(function (response) {
                    $scope.Items = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })
            }
            $scope.Init();


            $scope.makeItemInactive = function (id) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.makeItemInactive(id).then(function (response) {
                    if (response.data) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $scope.Init();
                    } else {
                        ionicToast.show('Failed', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                });
            }

            $scope.RemoveItemoffer = function (id) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.RemoveItemoffer(id).then(function (response) {
                    if (response.data) {
                        ionicToast.show('Success', 'bottom', false, 2500);
                        $scope.Init();
                    } else {
                        ionicToast.show('Failed', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function (err) {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                });
            }

            $scope.edit = function (id) {
                $state.go('addItem', {
                    ItemId: id
                });
            }

            $scope.Delete = function (id) {
                $ionicActionSheet.show({
                    titleText: 'Confirm Delete',
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
                            $scope.ConfirmDelete(id);
                        }
                        return true;
                    },
                    destructiveButtonClicked: function () {
                        return true;
                    }
                });

            }

            $scope.ConfirmDelete = function (id) {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                MainService.DeleteItem(id).then(function (response) {
                    if (response.data == true) {
                        ionicToast.show('Deleted', 'bottom', false, 2500);
                        $scope.Init();
                    } else {
                        ionicToast.show('Cannot Delete Sales Done', 'bottom', false, 2500);
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                    ionicToast.show('Network Error', 'bottom', false, 2500);
                })

            }



                }]);
angular.module("eahara")
    .controller("offerItemsController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicSlideBoxDelegate', '$interval', 'MainService', '$stateParams',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicSlideBoxDelegate, $interval, MainService, $stateParams) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $scope.Init = function () {

                $scope.basePath = config.basePath;

                $scope.Items = [];

                if ($stateParams.OfferId != null) {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    MainService.ItemsByOfferId($stateParams.OfferId).then(function (res) {
                        $scope.Items = res.data;
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });

                }

            }
            $scope.Init();

            $scope.GoItemDetail = function (Id) {
                $state.go('itemsDetail', {
                    ItemId: Id
                });
            }


        }]);
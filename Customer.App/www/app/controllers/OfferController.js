angular.module("eahara")
    .controller("OfferController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', 'MainService',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, MainService) {


            $scope.Init = function () {



                $scope.LocInfo = AuthenticationService.getLocInfo();

                if ($scope.LocInfo != null) {

                    $scope.basePath = config.basePath;
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    $scope.Offers = [];
                    MainService.GetOffers($scope.LocInfo.LocationId).then(function (res) {
                        $scope.Offers = res.data;
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 1500);
                        $ionicLoading.hide();
                    });
                }

            }
            $scope.Init();

            $scope.GoOfferItems = function (id) {
                $state.go('offerItems', {
                    OfferId: id
                });
            }

        }]);

angular.module("eahara")
    .controller("searchController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$stateParams', 'MainService', '$cordovaSocialSharing',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $stateParams, MainService, $cordovaSocialSharing) {


            $scope.TokenInfo = AuthenticationService.getTokenInfo();
            $scope.basePath = config.basePath;


            $scope.init = function () {

                $scope.SearchTab = {
                    Keyword: "",
                }

                $scope.Shops = [];
                $scope.Items = [];

                $scope.now = new Date();
                $scope.Time = $scope.now.getHours();
                $scope.Minutes = $scope.now.getMinutes();
                $scope.CurrentTime = $scope.Time + "." + $scope.Minutes;
                $scope.CurrentTime = parseFloat($scope.CurrentTime);
            }
            $scope.init();

            $scope.Search = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });


                MainService.ShopsByKeyword($scope.SearchTab.Keyword, $scope.LocInfo.LocationId).then(function (response) {
                    $scope.Shops = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });

                MainService.ItemsByKeyword($scope.SearchTab.Keyword, $scope.LocInfo.LocationId).then(function (response) {
                    $scope.Items = response.data;
                    $ionicLoading.hide();
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });

            }

            $scope.GoItemDetail = function (Id) {
                $state.go('itemsDetail', {
                    ItemId: Id
                });
            }



    }]);

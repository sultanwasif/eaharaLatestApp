angular.module("eahara")
    .controller("itemsController", ['$scope', '$state', 'app.config', 'MainService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicModal', 'LoginService', 'MainService',
        function ($scope, $state, config, MainService, AuthenticationService, $ionicLoading, ionicToast, $ionicModal, LoginService, MainService) {


            $scope.Init = function () {

                $scope.basePath = config.basePath;
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.Items = [];
                MainService.ItemCategoryInDropdown().then(function (res) {
                    $scope.Items = res.data;
                    $ionicLoading.hide();
                }, function (err) {
                    ionicToast.show('Network Error', 'bottom', false, 1500);
                    $ionicLoading.hide();
                });

            }
            $scope.Init();



            $scope.GoItems = function (Id) {
                $state.go('itemsBycategory', {
                    CatId: Id
                });
            }




        }]);

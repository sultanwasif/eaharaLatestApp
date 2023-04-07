angular.module("eahara")
    .controller("addItemController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaCamera', '$stateParams',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaCamera, $stateParams) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $scope.Init = function () {

                $scope.Item = {
                    Name: "",
                    Price: "",
                    Image: "",
                    TagLine: "",
                    ShopId: "",
                    ItemCategoryId: "",
                    OfferId: "",
                    Description: "",
                    Preference: "Non-Vegetarian",
                }

                $scope.ViewVal = 0;

                $scope.load = 0;
                $scope.ItemImgEdit = false;
                $scope.myImage = '';

                if ($stateParams.ItemId > 0) {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    MainService.ItemsById($stateParams.ItemId).then(function (response) {
                        $scope.Item = response.data;
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                        $ionicLoading.hide();
                    })

                }
            }
            $scope.Init();


            $scope.ItemCategories = [];
            MainService.ItemCategoryInDropdown().then(function (response) {
                $scope.ItemCategories = response.data;
                $ionicLoading.hide();
            }, function (err) {
                $ionicLoading.hide();
                ionicToast.show('Network Error', 'bottom', false, 2500);
            })

            $scope.Offers = [];
            MainService.GetShopOffers($scope.TokenInfo.ShopId).then(function (response) {
                $scope.Offers = response.data;
                $ionicLoading.hide();
            }, function (err) {
                $ionicLoading.hide();
                ionicToast.show('Network Error', 'bottom', false, 2500);
            })

            $scope.takePicture = function () {
                var options = {
                    quality: 90,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 250,
                    targetHeight: 250,
                    //popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(options).then(function (data) {
                    $scope.Item.Image = "data:image/jpeg;base64," + data;
                    console.log("data " + $scope.upload.Image);
                }, function (error) {
                    console.log("error data " + JSON(data));
                });
            }

            //            $scope.takePicture = function () {
            //                console.log("sss");
            //                var options = {
            //                    quality: 80,
            //                    destinationType: Camera.DestinationType.DATA_URL,
            //                    sourceType: Camera.PictureSourceType.CAMERA,
            //                    allowEdit: true,
            //                    encodingType: Camera.EncodingType.JPEG,
            //                    targetWidth: 266,
            //                    targetHeight: 266,
            //                    popoverOptions: CameraPopoverOptions,
            //                    saveToPhotoAlbum: false
            //                };
            //
            //                $cordovaCamera.getPicture(options).then(function (imageData) {
            //                    var image = document.getElementById('myImage');
            //                    image.src = "data:image/jpeg;base64," + imageData;
            //                    $scope.Item.Image = imageData;
            //                }, function (err) {
            //                    console.log("error");
            //                });
            //            }


            $scope.SaveItem = function () {
                if ($scope.Item.Name == "") {
                    ionicToast.show('Enter Name', 'bottom', false, 2500);
                } else if ($scope.Item.Price == "") {
                    ionicToast.show('Enter Price', 'bottom', false, 2500);
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    $scope.Item.ShopId = $scope.TokenInfo.ShopId;
                    MainService.AddItems($scope.Item).then(function (response) {
                        if (response) {
                            ionicToast.show('Success', 'bottom', false, 2500);
                            $scope.Init();
                            $ionicLoading.hide();
                            $state.go("myItems");
                        } else {
                            ionicToast.show('Failed', 'bottom', false, 2500);
                            $ionicLoading.hide();
                        }
                    }, function (err) {
                        $ionicLoading.hide();
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                    });
                }
            }



                }]);
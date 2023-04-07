angular.module("eahara")
    .controller("addOfferController", ['$scope', '$state', 'app.config', 'LoginService', 'AuthenticationService', '$ionicLoading', 'ionicToast', '$ionicHistory', 'MainService', '$cordovaCamera', '$stateParams',
        function ($scope, $state, config, LoginService, AuthenticationService, $ionicLoading, ionicToast, $ionicHistory, MainService, $cordovaCamera, $stateParams) {

            $scope.TokenInfo = AuthenticationService.getTokenInfo();

            $scope.Init = function () {

                $scope.Offer = {
                    Tittle: "",
                    Percentage: 0,
                    Image: "",
                    ShopId: "",
                    IsPercentage: false,
                }

                $scope.ViewVal = 0;

                $scope.load = 0;
                $scope.ItemImgEdit = false;
                $scope.myImage = '';

                if ($stateParams.OfferId > 0) {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    MainService.GetOfferyId($stateParams.OfferId).then(function (response) {
                        $scope.Offer = response.data;
                        $ionicLoading.hide();
                    }, function (err) {
                        ionicToast.show('Network Error', 'bottom', false, 2500);
                        $ionicLoading.hide();
                    })

                }
            }
            $scope.Init();


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
            //                    $scope.Offer.Image = imageData;
            //                }, function (err) {
            //                    console.log("error");
            //                });
            //            }

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
                    $scope.Offer.Image = "data:image/jpeg;base64," + data;
                    console.log("data " + $scope.upload.Image);
                }, function (error) {
                    console.log("error data " + JSON(data));
                });
            }

            $scope.SaveItem = function () {
                if ($scope.Offer.Tittle == "") {
                    ionicToast.show('Enter title', 'bottom', false, 2500);
                } else if ($scope.Offer.Percentage < 0) {
                    ionicToast.show('Enter valid value', 'bottom', false, 2500);
                } else {

                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    $scope.Offer.ShopId = $scope.TokenInfo.ShopId;
                    MainService.AddOffers($scope.Offer).then(function (response) {
                        if (response) {
                            ionicToast.show('Success', 'bottom', false, 2500);
                            $scope.Init();
                            $ionicLoading.hide();
                            $state.go("myOffers");
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
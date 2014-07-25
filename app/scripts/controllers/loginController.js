
angular.module('realTimeTriviaApp')
  .controller('loginCtrl', function ($scope, $firebase, $firebaseSimpleLogin) {
    var dataRef = new Firebase("https://maxwellzirbel.firebaseio.com/");
    $scope.loginObj = $firebaseSimpleLogin(dataRef);
    
        $scope.loginTwitter = function(){
        $scope.loginObj.$login('twitter')
            .then(function(user){
                var username = user.username;
                var twitterData = user.thirdPartyUserData;
                var usersRef = new Firebase("https://maxwellzirbel.firebaseio.com/users/");
                var usernameRef = new Firebase("https://maxwellzirbel.firebaseio.com/users/" + username);
                $scope.usernameRef = $firebase(usersRef);
                console.log($scope.usernameRef);
                if($scope.usernameRef.$child(username)){
                    console.log('exists');
                } else{
                    usernameRef.set({username: user.username, points: 0, profile_image_url: twitterData.profile_image_url })
                }
               
            }, function(error){
                console.log('login failed: ', error);
            });
        }

        $scope.login = function(type){
            console.log($('button').data('type'));
            if ($('button').data('type') == 'twitter'){
                auth.login('twitter');
            }
        };

  });
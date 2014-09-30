'use strict';

userModule.factory('userInfo', ["$rootScope", function ($rootScope) {

    var userInfo = {
        isLoggedIn: false,
        userid: "",
        username: "",
        usertype: "",
        name: "",
        token: "",
        expires: ""
    }

    var setUserInfo = function(data){
        userInfo.isLoggedIn = true;
        userInfo.userid = data.user.id;
        userInfo.username = data.user.username;
        userInfo.usertype = data.user.usertype;
        userInfo.name = data.user.username;
        userInfo.token = data.token;
        userInfo.expires = data.expires;
    };

    var clearUserInfo = function(){
        userInfo.isLoggedIn = false;
        userInfo.userid = "";
        userInfo.username = "";
        userInfo.usertype = "";
        userInfo.name = "";
        userInfo.token = "";
        userInfo.expires = "";
    };

    return {
        userInfo: userInfo,
        setUserInfo: setUserInfo,
        clearUserInfo: clearUserInfo
    };

}]);
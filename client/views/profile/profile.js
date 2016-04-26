//import steamAPI from 'steam-webapi';
var pos = 0, srcData;

Template.profile.onCreated(function() {

    Session.set("profileEdit", false);
    Session.set("coverEdit", false);
    Session.set("CoverImageBase64", false);

    var self = this;
    self.autorun(function() { // Stops all current subscriptions
        //////////////////////////////////////////////////////////////////////
        // Get information about the user that the profile belong to him
        //////////////////////////////////////////////////////////////////////
        var username = FlowRouter.getParam('username');
        self.subscribe('getUserProfileDataByUsername', username);
        self.subscribe('getUserPostsByUsername', 5);
    });
});


Template.profile.onRendered(function(){


    $("body").on('change','#CoverUpload' , function(){

        var filesSelected = document.getElementById("CoverUpload").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64

                Session.set("CoverImageBase64", srcData);


                $("#profile-cover-image").attr("style", "background-image: url(" + srcData + ")");

            };

            fileReader.readAsDataURL(fileToLoad);
        }

    });
});

Template.profile.events({
    'click #follow-user': function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        Meteor.call('follow',userData._id);
        return true;
    },
    'click #unfollow-user': function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        Meteor.call('unfollow', userData._id);
        return true;
    },
    'mouseenter .user-edit-avatar':function(){
        $('.edit-avatar-mask').show();
    },
    'mouseleave .user-edit-avatar':function(){
        $('.edit-avatar-mask').hide();
    },
    'drag #profile-cover-image': function (evt) {
        // only if in edit mode

        console.log("cover ed: ", Session.get("coverEdit"), evt.drag);

        if(Session.get("coverEdit")) {

            if (evt.drag.type === 'dragstart') {
                console.log('You start dragging! ', evt.drag)
            } else if (evt.drag.type === 'dragend') {
                console.log('You stopped dragging!')
            } else if (evt.drag.type === 'dragging') {
                pos += evt.drag.dy;
                $("#profile-cover-image").css("background-position-y", pos + "px");
            }
        }
    },
    'click .profileEdit': function(){
        Session.set("profileEdit", true);
    },
    'click .finishEditProfile': function(){
        Session.set("profileEdit", false);
    },
    'click .profileEditBlock': function(){
        Session.set("coverEdit", true);

    },
    'click .cancelCoverEdit': function(){

        Session.set("CoverImageBase64", false);
        $("#profile-cover-image").attr("style", "background-image: url(" + Meteor.user().profile.cover + ")");

        Session.set("coverEdit", false);
    },
    'click .finishCoverEdit': function(){
        Session.set("coverEdit", false);
        if(Session.get("CoverImageBase64")) {
            Meteor.call("updateCoverImage", pos, Session.get("CoverImageBase64"));
        }
        if(Meteor.user().profile.cover_position !== pos){
            Meteor.call("updateCoverImage", pos);
        }
    }

});

Template.profile.helpers({
    userProfileData: function() {

        username = FlowRouter.getParam('username');
        userData = Meteor.users.findOne({
                username: username
            }) || {};
        // Followers
        if(userData.profile.followers)
            Meteor.subscribe('usersListByID', userData.profile.followers);

        // Following
        if(userData.profile.follow)
            Meteor.subscribe('usersListByID', userData.profile.follow);

        if( _.isEmpty(userData)){
            FlowRouter.go('/404')
        }


        if(userData._id == Meteor.userId()){
            userData.userProfile = true;
        }

        return userData;
    },
    posts: function(){

        return Posts.find({createdBy: Meteor.userId()});
    },
    isUserFollowing: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        //////////////////////////////////////////////////////////////////////
        // Get information about the user that viewing the profile | if following user
        //////////////////////////////////////////////////////////////////////

        // get user following ID's
        var viewUser = Meteor.user();

        if(viewUser) {
            var follows = viewUser.profile.follow;
        }

        // get the profile user ID
        var userProfileId = userData._id;

        // search if user is following the profile user

        var isTheUserFollowing = _.some(follows, function(id) {
            return id == userProfileId;
        });

        return isTheUserFollowing

        return false;
    },
    followersCount: function(){
        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        if(userData.followers || !_.isEmpty(userData))
            return userData.profile.followers.length;
        else return 0
    },
    followingCount: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        if(typeof userData.follow !== "undefined" || !_.isEmpty(userData))
            return userData.profile.follow.length;
        else return 0
    },
    followersData: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        var followerUsers = Meteor.users.find({
                '_id': { $in: userData.profile.followers}
            },{fields: {'username': 1, 'profile.avatar': 1}}, function(err, docs){
                console.log(docs);
            });

        return followerUsers;
    },
    followsData: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        var followsUsers = Meteor.users.find({
            '_id': { $in: userData.profile.follow}
        },{fields: {'username': 1, 'profile.avatar': 1}}, function(err, docs){
            console.log(docs);
        });

        return followsUsers;
    },
    userIsOnline:function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        return userData.status.online

    },
    profileEdit: function(){

        return Session.get("profileEdit");


    },
    coverEdit: function(){
        return Session.get("coverEdit");
    }

});

Template.profile.onDestroyed(function(){
    Session.set("profileEdit", false);
    Session.set("coverEdit", false);
    Session.set("CoverImageBase64", false);
});
// user profile data
var userData, username, follows;

Template.profile.onCreated(function() {

    // Subscribe only the relevant subscription to this page
    var self = this;
    self.autorun(function() { // Stops all current subscriptions

        //////////////////////////////////////////////////////////////////////
        // Get information about the user that the profile belong to him
        //////////////////////////////////////////////////////////////////////
        username = FlowRouter.getParam('username'); // Get the user username from the route parameter

        self.subscribe('getUserDataByUsername', username.trim());

        userData = Meteor.users.findOne({
                username: username
            }) || {};


    });
});

Template.profile.onRendered(function(){

    setTimeout(function(){
        $('.ui.followers.modal').modal('attach events', '.fireFollowersModal', 'show').modal({blurring: true});
        $('.ui.following.modal').modal('attach events', '.fireFollowingModal', 'show').modal({blurring: true});


    }, 500);










});



Template.profile.events({
    'click #follow-user': function(){
        Meteor.call('follow',userData._id);
        return true;
    },
    'click #unfollow-user': function(){
        Meteor.call('unfollow', userData._id);
        return true;
    },
    'click #showModal': function(){
        $('.ui.modal').modal('attach events', '#showModal', 'show');
    },
    'mouseenter .user-edit-avatar':function(){
        $('.edit-avatar-mask').show();
    },
    'mouseleave .user-edit-avatar':function(){
        $('.edit-avatar-mask').hide();
    }
});





Template.profile.helpers({
    userProfileData: function() {

        // important - to B reactive
        /////////////////////////////////////////////////////////////////////////////
        userData = Meteor.users.findOne({
                username: username
            }) || {};

        // Followers
        Meteor.subscribe('profilefollowingListUserByID', userData.profile.followers);
        // Following
        Meteor.subscribe('profilefollowingListUserByID', userData.profile.follow);


        if( _.isEmpty(userData)){
            FlowRouter.go('/404')
        }


        if(userData._id == Meteor.userId()){
            userData.userProfile = true;
        }

        return userData;
    },
    isUserFollowing: function(){

        //////////////////////////////////////////////////////////////////////
        // Get information about the user that viewing the profile | if following user
        //////////////////////////////////////////////////////////////////////

        // get user following ID's
        var viewUser = Meteor.user();

        if(viewUser) {
            var follows = viewUser.profile.follow;
        }

        if(!_.isEmpty(userData)){

            // get the profile user ID
            var userProfileId = userData._id;

            // search if user is following the profile user

            var isTheUserFollowing = _.some(follows, function(id) {
                return id == userProfileId;
            });

            return isTheUserFollowing
        }
        return false;
    },
    followersCount: function(){
        if(typeof userData.followers !== "undefined" || !_.isEmpty(userData))
            return userData.profile.followers.length;
        else return 0
    },
    followingCount: function(){
        if(typeof userData.follow !== "undefined" || !_.isEmpty(userData))
            return userData.profile.follow.length;
        else return 0
    },
    followersData: function(){
            var followerUsers = Meteor.users.find({
                '_id': { $in: userData.profile.followers}
            },{fields: {'username': 1, 'profile.avatar': 1}}, function(err, docs){
                console.log(docs);
            });

        return followerUsers;
    },
    followsData: function(){
        var followsUsers = Meteor.users.find({
            '_id': { $in: userData.profile.follow}
        },{fields: {'username': 1, 'profile.avatar': 1}}, function(err, docs){
            console.log(docs);
        });

        return followsUsers;
    }



});

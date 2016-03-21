Template.profile.onCreated(function() {
    // Subscribe only the relevant subscription to this page

    var self = this;
    self.autorun(function() { // Stops all current subscriptions

        //////////////////////////////////////////////////////////////////////
        // Get information about the user that the profile belong to him
        //////////////////////////////////////////////////////////////////////

        var username= FlowRouter.getParam('username'); // Get the user username from the route parameter
        self.subscribe('userProfileData', username); // Subscribe to the single entry in the collection with the route params id




    });
});


Template.profile.events({
    'click #follow-user': function(){
        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        Meteor.call('follow',userData._id);

    },
    'click #unfollow-user': function(){
        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        Meteor.call('unfollow', userData._id);
    }


});

Template.profile.helpers({
    userProfileData: function() {
        var username = FlowRouter.getParam('username');

        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        if(_.isEmpty(userData)){
            FlowRouter.go("/404");
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

        var username = FlowRouter.getParam('username');
        var userProfile = Meteor.users.findOne({
                "username": username
            }) || {};


        if(!_.isEmpty(userProfile)){

            // get the profile user ID
            var userProfileId = userProfile._id;

            // search if user is following the profile user

            var isTheUserFollowing = _.some(follows, function(id) {
                return id == userProfileId;
            });

            return isTheUserFollowing
        }
        return false;
    }
});
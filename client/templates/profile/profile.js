Template.profile.helpers({

});


Template.profile.onCreated(function() {
    // Subscribe only the relevant subscription to this page
    var self = this;
    self.autorun(function() { // Stops all current subscriptions
        var username= FlowRouter.getParam('username'); // Get the collection id from the route parameter
        self.subscribe('userProfileData', username); // Subscribe to the single entry in the collection with the route params id
    });
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

        console.log("load user profile data: ", userData);


        if(userData._id == Meteor.userId()){
            userData.userProfile = true;
        }

        return userData;
    }
});
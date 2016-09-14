Template.postView.onCreated(function(){
    self = this;
    self.autorun(function(){

        var username = FlowRouter.getParam('username');
        self.subscribe("getUserProfileDataByUsername", username);

    });


});



Template.postRightSideBar.helpers({
    postOwner: function(){
        
        var username = FlowRouter.getParam('username');
        var user = Meteor.users.findOne({ "username": username});

        if(user)
            return user;

    },
    postsCount: function(){
        var username = FlowRouter.getParam('username');
        var user = Meteor.users.findOne({ "username": username});

        if(user)
            return user.profile.posts_events.post_count;

    },
    followersCont: function(){

        var username = FlowRouter.getParam('username');
        var user = Meteor.users.findOne({ "username": username});

        if(user)
            return user.profile.followers.length;

    },
    followsCont: function(){

        var username = FlowRouter.getParam('username');
        var user = Meteor.users.findOne({ "username": username});

        if(user)
            return user.profile.follow.length;

    }
});


Template.postRightSideBar.events({
    'click .profileLink': function(){
        if(Meteor.user())
            FlowRouter.go('/@/' + Meteor.user().username);
    },
    'click .settingsLink': function(){
        if(Meteor.user())
            FlowRouter.go('/settings');
    },
    'click .MessagesLink': function(){
        FlowRouter.go('/messages');
    },
    'click .left-user-block':function(){
        if(Meteor.user())
            FlowRouter.go('/@/' + Meteor.user().username);
    }
});
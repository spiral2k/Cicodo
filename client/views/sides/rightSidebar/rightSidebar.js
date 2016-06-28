

Template.rightSidebar.helpers({
    currentUserData: function(){
        if(Meteor.user())
            return Meteor.user();
    },
    postsCount: function(){
        if(Meteor.user())
            return Meteor.user().profile.posts_events.post_count;

    },
    followersCont: function(){
        if(Meteor.user())
            return Meteor.user().profile.followers.length;
    },
    followsCont: function(){
        if(Meteor.user())
            return Meteor.user().profile.follow.length;
    }
});


Template.rightSidebar.events({
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
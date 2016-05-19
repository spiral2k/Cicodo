Template.leftSidebar.helpers({
   currentUserData: function(){
       if(Meteor.user())
            return Meteor.user();
   }
});


Template.leftSidebar.events({
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
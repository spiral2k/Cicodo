Template.navbaruser.onRendered(function(){
    $('.username-dropdown').dropdown({
        transition: 'drop'
    });

    $('.masseges-dropdown').dropdown({
        transition: 'drop'
    });



});

Template.navbaruser.helpers({
    username: function(){
        var username = Meteor.user().username;
        return username;
    },
    avatar: function(){
        var avatar = Meteor.user().profile.avatar;
        return avatar;
    }
});


Template.navbaruser.events({
    //LOGOUT
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();

        console.log("dwdw");
        FlowRouter.go('/');
    },
    'click .item': function(event){
        $(event.target).removeClass('selected');
        $(event.target).removeClass('active');
    }
});

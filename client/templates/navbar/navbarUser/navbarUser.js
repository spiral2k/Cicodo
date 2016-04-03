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
    },
    hasNewMessages:function(){
        //var c= Meteor.users.find( {_id: Meteor.userId()},
        //    {"profile.messages":{"$elemMatch":{new_messages:{$gte:1}}}} ).count()

        var userMessages = Meteor.user().profile.messages;
        var count = 0;
        for(var i = 0; i < userMessages.length; i++){

            console.log("userMessages: ", userMessages[i]);

            if(userMessages[i].new_messages >= 1){
                count++;
            }

        }

        return count;

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

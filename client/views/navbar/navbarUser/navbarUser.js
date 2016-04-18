var userMessages, usersMessagesArray = [];

Template.navbaruser.onCreated(function(){
    self = this;
    self.autorun(function() {

        userMessages = Meteor.user().profile.messages;

        if(userMessages)
            for(var i = 0; i < userMessages.length && i < 5; i++){
                usersMessagesArray.push(userMessages[i].user_message_id);
            }

         self.subscribe('usersListByID', usersMessagesArray);

    });

});



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

        userMessages = Meteor.user().profile.messages;

        var count = 0;
        for(var i = 0; i < userMessages.length; i++){
            if(userMessages[i].new_messages >= 1){
                count++;
            }
        }

        if(count == 0){
            return false;
        }

        return count;
    },
    messages: function(){
        var messages = Meteor.user().profile.messages;
        if(messages.length > 0)
            return _.sortBy( messages, 'new_messages' ).reverse();
        else
            return false

    },
    newMessages: function(){

        var messages = Meteor.user().profile.messages;

        for(var i = 0; i < messages.length; i++){
            if(messages[i].user_message_id === this.user_message_id){
                if(messages[i].new_messages > 0) {
                    return messages[i].new_messages;
                }
                else
                    return false;
            }

        }

    }
});


Template.navbaruser.events({
    //LOGOUT
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
    },
    'click .item': function(event){
        $(event.target).removeClass('selected');
        $(event.target).removeClass('active');
    },
    'click .messagesUserItem': function(){
        var user = Meteor.users.findOne({_id: this.user_message_id }, {fields: {username:1}});
        Session.set("messageUserName",user.username);
        FlowRouter.go("/messages/" + user.username);
    },
    'click .allMessages': function(){
        Session.set("messageUserName", null);
        FlowRouter.go("/messages");
    }
});

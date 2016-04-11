var userMessages, usersMessagesArray = [], messagesReady, usersReady;


Template.navbaruser.onCreated(function(){
    self = this;
    self.autorun(function() {

        userMessages = Meteor.user().profile.messages;

        if(userMessages)
            for(var i = 0; i < userMessages.length && i < 5; i++){
                usersMessagesArray.push(userMessages[i].user_message_id);
                messagesReady = self.subscribe('lastMessageById', userMessages[i].user_message_id);
            }

        usersReady = self.subscribe('usersListByID', usersMessagesArray);


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
        var count = 0;
        for(var i = 0; i < userMessages.length; i++){
            if(userMessages[i].new_messages >= 1){
                count++;
            }
        }
        if(count == 0){
            return "";
        }

        return count;
    },
    messages: function(){
        if(messagesReady.ready() && usersReady.ready())
            return Messages.find();
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
    },
    'click .messagesUserItem': function(){
        var user = Meteor.users.findOne({_id: this.send_from }, {fields: {username:1}});

        FlowRouter.go("/messages/" + user.username);

    }
});

var userMessages, messagesUsersArray = [], userMessagesReady;


Template.navbaruser.onCreated(function(){
    self = this;

    self.autorun(function() {
        userMessages = Meteor.user().profile.messages;

        for(var i = 0; i < userMessages.length; i++){
            messagesUsersArray.push(userMessages[i].user_message_id);
        }

        self.subscribe('usersListByID', messagesUsersArray);


        console.log("messagesUsersArray: ", messagesUsersArray);

        userMessagesReady = self.subscribe('lastMessageById', messagesUsersArray);

    });

});



Template.navbaruser.onRendered(function(){
    $('.username-dropdown').dropdown({
        transition: 'drop'
    });

    $('.masseges-dropdown').dropdown({
        transition: 'drop'
    });

    this.subscribe('messages');


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


        var count = 0;

        for(var i = 0; i < userMessages.length; i++){

            if(userMessages[i].new_messages >= 1){
                count++;
            }

        }

        return count;

    },
    messages: function(){

            return Messages.find({send_from: {$in: messagesUsersArray}, send_to: Meteor.userId}, {limit: 1})

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

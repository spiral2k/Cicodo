var userData;
Template.messages.onCreated(function(){
    var self = this;
    self.autorun(function() {

        // get data of the user
        var username = FlowRouter.getParam('username');
        Session.set("messageUserName", username);

        // Subs
        self.subscribe('getUserDataByUsername', username);
        self.subscribe('messageView', username);

    });
});





Template.messagesView.helpers({
    userData: function(){

        var username = FlowRouter.getParam('username');

        var userData = Meteor.users.find(
                {'username':username}
            ) || {};

        console.log("messageView username: ", username);
        console.log("messageView userData: ", userData);

        return userData
    },
    avatar:function(){
      return Meteor.user().profile.avatar;
    },
    messages: function(){
        userData = Meteor.users.findOne({
                username: Session.get("messageUserName")
            }) || {};

        return Messages.find({ $or: [{send_to: Meteor.userId(), send_from: userData._id}, {send_to: userData._id, send_from: Meteor.userId()}] }, {sort: {timestamp: 1}});
    }
});

Template.messagesView.events({
    'keyup #textMessage': function(e) {
        e.preventDefault();

        var query_selector = $('#textMessage');
        var inputVal = query_selector.val();

        if(!!inputVal) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                Meteor.call('newMessage', {
                        text: inputVal
                    },
                    // what person will recive that message
                    Session.get("messageUserName")
                );

                query_selector.val("");
                return false;
            }
        }

    }
});
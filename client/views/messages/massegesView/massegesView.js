Template.messages.onCreated(function(){
    var self = this;

    self.autorun(function() {
        if(Meteor.user()) {
            if (FlowRouter.getParam('username') === Meteor.user().username) {
                FlowRouter.go('/messages');
            }

            // set data of the user
            if (!Session.get("messageUserName")) {
                Session.set("messageUserName", FlowRouter.getParam('username'))
            }

            // Subs
            self.subscribe('getUserDataByUsername', Session.get("messageUserName"));
            self.subscribe('getMessagesForMessageView', Session.get("messageUserName"));

        }

    });
});


Template.messagesView.onRendered(function(){
    var userData = Meteor.users.findOne({
                username: Session.get("messageUserName")
            }, { fields: { username: 1, 'profile.avatar': 1 } }) || {};

    if(document.getElementById("messages-view-warp"))
        document.getElementById("messages-view-warp").scrollTop = document.getElementById("messages-view-warp").scrollHeight;



    if(FlowRouter.getParam('username') && Meteor.user()) {
        Meteor.call("resetNewMessagesInMessage", Session.get("messageUserName"));
        Meteor.call("updateUserMessagesPath", Session.get("messageUserName"));
    }
});


Template.messagesView.helpers({
    avatar:function(){
      return Meteor.user().profile.avatar;
    },
    messages: function(){
        var userData = Meteor.users.findOne({
                username: Session.get("messageUserName")
            }) || {};

        if(document.getElementById("messages-view-warp"))
            document.getElementById("messages-view-warp").scrollTop = document.getElementById("messages-view-warp").scrollHeight;

        var messages = Messages.find({ $or: [{send_to: Meteor.userId(), send_from: userData._id}, {send_to: userData._id, send_from: Meteor.userId()}] }, {sort: {timestamp: 1}});

        messages.observeChanges({
            addedBefore: function (id, user) {
                if(document.getElementById("messages-view-warp"))
                    document.getElementById("messages-view-warp").scrollTop = document.getElementById("messages-view-warp").scrollHeight;
            }
        });

        return messages;
    },
    userMessage:function(){
        var userData = Meteor.users.findOne({
                username: Session.get("messageUserName")
            }, {fields: {username:1, 'profile.avatar': 1}}) || {};

        return  userData;
    }
});


Template.messagesView.events({
    'keyup #textMessage': function(e) {
        e.preventDefault();

        var query_selector = $('#textMessage');
        var inputVal = query_selector.val();

        if(!!inputVal.trim() && inputVal != "") {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                Meteor.call('newMessage', {
                        text: inputVal
                    },
                    // what person will recive that message
                    Session.get("messageUserName")
                );
                document.getElementById("messages-view-warp").scrollTop = document.getElementById("messages-view-warp").scrollHeight;
                query_selector.val("");
                return false;
            }
        }

    }
});

Template.messages.onDestroyed(function(){
    Session.set("messageUserName", null);
    Meteor.call("updateUserMessagesPath", null);
});
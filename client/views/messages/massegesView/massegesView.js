
Template.messages.onCreated(function(){
    var self = this;
    self.autorun(function() {

        // get data of the user
        if(!Session.get("messageUserName")){
            Session.set("messageUserName",FlowRouter.getParam('username'))
        }

        // Subs
        self.subscribe('getUserDataByUsername',Session.get("messageUserName"));
        self.subscribe('messageView',Session.get("messageUserName"));

    });
});

Template.messagesView.helpers({
    avatar:function(){
      return Meteor.user().profile.avatar;
    },
    messages: function(){
        var userData = Meteor.users.findOne({
                username: Session.get("messageUserName")
            }) || {};

        return Messages.find({ $or: [{send_to: Meteor.userId(), send_from: userData._id}, {send_to: userData._id, send_from: Meteor.userId()}] }, {sort: {timestamp: 1}});
    }
});


Template.messagesView.onRendered(function(){

    document.getElementById("messages-view-warp").scrollTop = document.getElementById("messages-view-warp").scrollHeight;

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

Template.messages.onDestroyed(function(){
    Session.set("messageUserName", null);
});
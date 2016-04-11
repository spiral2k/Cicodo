var userData;
Template.messages.onCreated(function(){
    self = this;
    self.autorun(function() {
        userData = Meteor.users.findOne({
                username: Session.get("messageUserName")
            }) || {};

        // need fix
        self.subscribe('messageView', userData);
    });
});

Template.messagesView.helpers({
    avatar:function(){
      return Meteor.user().profile.avatar;
    },
    messages: function(){
        userData = Meteor.users.findOne({
                username: Session.get("messageUserName")
            }) || {};

        return Messages.find({ $or: [{send_to: Meteor.userId(), send_from: userData._id}, {send_to: userData._id, send_from: Meteor.userId()}] });
    }
});

Template.messagesView.events({

});
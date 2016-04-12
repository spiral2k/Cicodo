
Template.messages.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe('usersListByID', Meteor.user().profile.open_messages);
    });
});


Template.messages.helpers({
    isMainMessages: function(){
        if(FlowRouter.current().route.path === '/messages'){
            return true;
        }

        return false;

    },
    usernames: function () {
                return Meteor.users.find({
                    '_id': { $in: Meteor.user().profile.open_messages }
                }, { fields: { 'username': 1, 'profile.avatar': 1 } }, function (err, docs) {
                    console.log("Template.messages.helpers: Error getting usernames ", docs);
                });
    }
});


Template.messages.events({
    'click .messages-sidebar-user': function(){
        Session.set("messageUserName", this.username);

        FlowRouter.go('/messages/' + this.username)

        // change without reload
        //history.pushState({}, null, '/messages/' + this.username);

        return true;
    }
});
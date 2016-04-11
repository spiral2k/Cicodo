
Template.messages.onCreated(function(){
    self = this;
    self.autorun(function() {
        self.subscribe('usersListByID', Meteor.user().profile.open_messages);

    });
});


Template.messages.helpers({

    usernames: function () {
                return Meteor.users.find({
                    '_id': { $in: Meteor.user().profile.open_messages }
                }, { fields: { 'username': 1, 'profile.avatar': 1 } }, function (err, docs) {
                    console.log("Error getting usernames", docs);
                });
    }
});


Template.messages.events({
    'click .messages-sidebar-user': function(){
        // change without reload
        history.pushState({}, null, '/messages/' + this.username);
        return true;
    }
});
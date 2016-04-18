Meteor.users.deny({
    update: function(userId) {
        return userId === Meteor.userId();
    }
});


Messages.allow({
    insert: function (userId, doc) {
        return (userId && doc.send_from === userId);
    }
});
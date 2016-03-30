Meteor.users.deny({
    update: function() {
        return true;
    }
});


Messages.allow({
    insert: function (userId, doc) {
        return (userId && doc.user === userId);
    }
});
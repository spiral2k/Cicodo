Meteor.users.deny({
    update: function() {
        return true;
    }
});


Messages.allow({
    insert: function (userId, doc) {

        console.log("alaoow: ",userId, doc);

        return (userId && doc.send_from === userId);
    }
});
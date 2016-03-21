
Meteor.publish("users", function() {
    return Meteor.users.find({}, {fields: {'username': 1, 'profile': 1}});
});


Meteor.publish("posts", function() {
    return Posts.find();
})




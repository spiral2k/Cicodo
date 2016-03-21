
Meteor.publish("users", function() {
    return Meteor.users.find({}, {fields: {'username': 1, 'profile': 1}});
});





Meteor.publish("postsFollowedByUser", function(userIDPosts) {

    return Posts.find({createdBy: userIDPosts}, {sort: {'createdAt.date': -1}});
});




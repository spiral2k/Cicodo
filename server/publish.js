
Meteor.publish("usersFollowedByUser", function(userByID) {
    return Meteor.users.find({_id: userByID}, {fields: {'username': 1, 'profile': 1}});
});

Meteor.publish("postsFollowedByUser", function(postsByID, limit) {

    limit = limit || 5;

    return Posts.find({createdBy: postsByID}, {sort: {'createdAt.date': -1}, limit: limit});
});


Meteor.publish("getUserDataByUsername", function(user_name) {
    return Meteor.users.find(
        {username: user_name},
        {fields: {'username': 1, 'profile': 1}
        }
    );
});






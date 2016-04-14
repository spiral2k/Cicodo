
Meteor.publish("usersFollowedByUser", function(userByID) {
    return Meteor.users.find({_id: userByID}, {fields: {'username': 1, 'profile': 1, "status.online": 1}});
});

Meteor.publish("postsFollowedByUser", function(postsByID, limit, date) {
    limit = limit || 5;
    date = date || new Date();
    return Posts.find({createdBy: postsByID, 'createdAt.date': {$lte: date} }, {sort: {'createdAt.date': -1}, limit: limit});
});


Meteor.publish("liveFeedPostsFollowedByUser", function(postsByID, limit) {
    limit = limit || 5;
    return Posts.find({createdBy: postsByID}, {sort: {'createdAt.date': -1}, limit: limit});
});


Meteor.publish("getUserDataByUsername", function(user_name) {
    return Meteor.users.find(
        {username: user_name},
        {fields: {'username': 1, 'profile': 1, "status.online": 1}
        }
    );
});

Meteor.publish("usersListByID", function(arrayOfIDs) {
    return Meteor.users.find({_id: {$in: arrayOfIDs}}, {fields: {'username': 1, 'profile.avatar': 1, "status.online": 1}});
});

Meteor.publish('messageView', function (username) {

    var user = Meteor.users.findOne({'username': username});

    return  Messages.find({$or: [{send_to: this.userId, send_from: user._id}, {send_to: user._id, send_from: this.userId}] },{sort: {timestamp: -1}, limit: 50});
});

Meteor.publish('lastMessageById', function (userMessageID) {
    return  Messages.find({send_from:  userMessageID, send_to: this.userId},{sort: {timestamp: 1}, limit: 1});
});





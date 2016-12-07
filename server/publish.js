
// Basic user info publish function.
Meteor.publish("basicUserInfo", function(userByID) {
    return Meteor.users.find({_id: userByID}, {fields: {'username': 1, 'profile.avatar': 1}});
});

Meteor.publish("getUserPostsByUsername", function(username, limit) {

    var user = Meteor.users.findOne({'username': username});

    limit = limit || 5;
    return Posts.find({createdBy: user._id}, {sort: {'createdAt': -1}, limit: limit});
});

Meteor.publish("postsFollowedByUser", function(postsByID, limit, date) {
    limit = limit || 5;
    date = date || new Date();
    console.log("hap");
    return Posts.find({createdBy: postsByID, 'createdAt': {$lte: date} }, {sort: {'createdAt': -1}, limit: limit});
});


Meteor.publish("liveFeedPostsFollowedByUser", function(postsByID, limit) {
    limit = limit || 5;
    return Posts.find({createdBy: postsByID}, {sort: {'createdAt': -1}, limit: limit});
});


Meteor.publish("getUserDataByUsername", function(username) {
    return Meteor.users.find(
        {username: username},
        {
            fields: {'username': 1, 'profile.avatar': 1, 'status.online': 1}
        });
});

// generic for profile
Meteor.publish("getUserProfileDataByUsername", function(username) {
    return Meteor.users.find(
        {username: username},
        {
            fields: {'username': 1, 'profile.posts_events': 1, 'profile.avatar': 1,'profile.cover': 1,'profile.cover_position': 1,'profile.followers': 1 ,'profile.follow': 1}
        });
});


// for listing users
Meteor.publish("usersListByID", function(arrayOfIDs) {
    return Meteor.users.find({_id: {$in: arrayOfIDs}}, {fields: {'username': 1, 'profile.avatar': 1,'profile.followers': 1 ,'profile.follow': 1}});
});


// for listing users
Meteor.publish("BasicUsersListByID", function(arrayOfIDs) {
    return Meteor.users.find({_id: {$in: arrayOfIDs}}, {fields: {'username': 1, 'profile.avatar': 1}});
});

Meteor.publish('getMessagesForMessageView', function (username) {
    var user = Meteor.users.findOne({'username': username});
    if(user)
        return Messages.find({$or: [{send_to: this.userId, send_from: user._id}, {send_to: user._id, send_from: this.userId}] },{sort: {timestamp: -1}, limit: 50});
});

Meteor.publish('lastMessageById', function (userMessageID) {
    return Messages.find({send_from:  userMessageID, send_to: this.userId},{sort: {timestamp: 1}, limit: 1});
});

Meteor.publish("getOnePostById", function(postsID) {
    return Posts.find({_id: postsID});
});

Meteor.publish("postCommentsLimit", function(postID, limit) {
    limit = limit || 10;
    return Comments.find({postid: postID}, {sort:{date: -1}, limit:limit});
});

Meteor.publish("postCommentsNolimit", function(postID) {
    return Comments.find({postid: postID}, {sort:{date: -1}});
});


Meteor.publish("userNotifications", function(limit) {
    limit = limit || 20;
    return Notifications.find({toUser: this.userId}, {sort:{createdAt: -1}, limit:limit});
});

Meteor.publish("getUserBasicDataByPostID", function(postID) {

    var post = Posts.findOne({_id: postID});

    return Meteor.users.find({_id: post.createdBy}, {fields: {'username': 1, 'profile.avatar': 1}});

});





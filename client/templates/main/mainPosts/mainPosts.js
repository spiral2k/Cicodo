Template.mainPosts.events({

});

Template.mainPosts.helpers({
    posts: function () {

        return Posts.find({}, {sort: {createdAt: {date: -1} }});
    },
    username: function(userId) {
        var user = Meteor.users.findOne(userId);

        if(user)
            return user.username;
    },
    getAvatar: function(userId){

        var user = Meteor.users.findOne(userId);

        if(typeof user !== 'undefined')
            if(typeof  user.profile !== 'undefined' || typeof user.profile.avatar !== 'undefined')
                return user.profile.avatar;
        else
            return "path to default avatar";
    }

});

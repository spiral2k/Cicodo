Template.mainPosts.onDestroyed(function(){
     Session.set('mainPostsLoadLimit', 5);
});

Template.mainPosts.onRendered(function(){
    Session.set('mainPostsLoadLimit', 5);

});

Template.mainPosts.events({
    'click #load-more': function() {
        Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + 20);
    }

});

Template.mainPosts.helpers({
    posts: function () {
        var followArray = Meteor.user().profile.follow;

        if(followArray) {
            //Subscribe to user followed posts
            for (var i = 0; i < followArray.length; i++) {
                // Post data
                Meteor.subscribe('postsFollowedByUser', followArray[i]);

                // User data
                Meteor.subscribe('usersFollowedByUser', followArray[i]);
            }
        }

        Meteor.subscribe('postsFollowedByUser', Meteor.userId());

        return Posts.find({},{limit: Session.get('mainPostsLoadLimit'), sort:{'createdAt.date': -1}});


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
    },
    postsCount: function(){
        if(Posts.find().count() > Session.get('mainPostsLoadLimit')){
            return true
        }else{
            return false
        }

    }

});

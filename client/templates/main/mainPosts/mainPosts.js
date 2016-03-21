Template.mainPosts.onDestroyed(function(){
        Session.set('mainPostsLoadLimit', 5);
});

Template.mainPosts.onRendered(function(){
    Session.set('mainPostsLoadLimit', 8);

});

Template.mainPosts.events({
    'click #load-more': function() {
        Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + 20);
    }

});

Template.mainPosts.helpers({
    posts: function () {
        var followArray = Meteor.user().profile.follow;

        //Subscribe to user followed posts
        for(i = 0; i < followArray.length; i++){
            console.log(followArray[i]);
            Meteor.subscribe('postsFollowedByUser', followArray[i]);
        };


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
        console.log(Posts.find().count(), Session.get('mainPostsLoadLimit'));

        if(Posts.find().count() > Session.get('mainPostsLoadLimit')){
            return true
        }else{
            return false
        }

    }

});

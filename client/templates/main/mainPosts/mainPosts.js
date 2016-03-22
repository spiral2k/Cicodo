Template.mainPosts.onCreated(function(){

    Session.set('mainPostsLoadLimit', 5);

    // get user followers array that contain ids;
    var followArray = Meteor.user().profile.follow;

    if(followArray) {
        //Subscribe to user followed posts
        for ( var i = 0; i < followArray.length; i++ ) {
            // User data
            this.posts = this.subscribe('usersFollowedByUser', followArray[i]);
            // Post data
            this.posts = this.subscribe('postsFollowedByUser', followArray[i]);
        }
        //subscribe to Meteor.user() posts.
        this.posts = this.subscribe('postsFollowedByUser', Meteor.userId());

    }

});


Template.mainPosts.events({
    'click #load-more': function() {
        Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + 20);
    }
});

Template.mainPosts.helpers({
    mainPostsReady:function(){
        return Template.instance().posts.ready();
    },
    posts: function () {
        var postsList = Posts.find({},{limit: Session.get('mainPostsLoadLimit'), sort:{'createdAt.date': -1}});
        return postsList;
    },
    username: function(userId) {
        var user = Meteor.users.findOne(userId);
        if(user)
            return user.username;
    },
    getAvatar: function(userId){

        var user = Meteor.users.findOne(userId);

        if(typeof user !== 'undefined')
            if((typeof  user.profile !== 'undefined' || typeof user.profile.avatar !== 'undefined') && user.profile.avatar != "") {
                return user.profile.avatar;
            } else {
                return "path to default avatar";
            }
    },
    postsCount: function(){
        //check if need to show 'Load more posts'.
        if(Posts.find().count() > Session.get('mainPostsLoadLimit')){
            return true
        }else{
            return false
        }

    }

});


Template.mainPosts.onDestroyed(function(){
    Session.set('mainPostsLoadLimit', 5);
});
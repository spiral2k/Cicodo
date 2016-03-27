
// get user followers array that contain ids;
var followArray = [], noPostsToLoad = "noPostsToLoad", hasPosts = 'hasPosts';


Template.regularFeed.onCreated(function(){

    Session.set('mainPostsLoadLimit', MAIN_POSTS_LOAD_LIMIT);
    Session.set('mainPostsSERVERLoadLimit', SERVER_MAIN_POSTS_LOAD_LIMIT);

    // now date for posts query
    Session.set('nowDate', new Date());

    followArray = Meteor.user().profile.follow;

    // critical for loader
    // need to know when to finish "loading"
    if(followArray) {
        //Subscribe to user followed posts
        for ( var i = 0; i < followArray.length; i++ ) {
            // User data
            this.posts = this.subscribe('usersFollowedByUser', followArray[i]);
            // Post data
            this.posts = this.subscribe('postsFollowedByUser', followArray[i], Session.get('mainPostsSERVERLoadLimit'), Session.get('nowDate'));
        }
    }
    //subscribe to Meteor.user() posts.
    this.posts = this.subscribe('postsFollowedByUser', Meteor.userId(), Session.get('mainPostsSERVERLoadLimit'), new Date());
});


Template.regularFeed.events({
    'click #load-more': function() {
        // increase session post limit
        Session.set('mainPostsSERVERLoadLimit', Session.get('mainPostsSERVERLoadLimit') + MAIN_POSTS_INCRESE_LOAD_LIMIT);
        Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + MAIN_POSTS_INCRESE_LOAD_LIMIT);
    }
});

Template.regularFeed.helpers({
    mainPostsReady:function(){
        if(typeof followArray !== 'undefined' &&  followArray.length > 0) {
            return Template.instance().posts.ready();
        } else {
            return true
        }
    },
    posts: function () {

        if(followArray) {
            //Subscribe to user followed posts
            for ( var i = 0; i < followArray.length; i++ ) {
                // User data
                Template.instance().posts = Template.instance().subscribe('usersFollowedByUser', followArray[i]);
                // Post data
                Template.instance().posts = Template.instance().subscribe('postsFollowedByUser', followArray[i], Session.get('mainPostsSERVERLoadLimit'), Session.get('nowDate'));
            }

        }
        //subscribe to Meteor.user() posts.
        Template.instance().posts = Template.instance().subscribe('postsFollowedByUser', Meteor.userId(), Session.get('mainPostsSERVERLoadLimit'), new Date());

        var postsList = Posts.find({},{limit: Session.get('mainPostsLoadLimit'), sort:{'createdAt.date': -1}});

        return postsList;
    },
    postsCount: function(){
        //check if need to show 'Load more posts'.

        if(Posts.find().count() > Session.get('mainPostsLoadLimit')){
            return 'hasPosts'
        }else{

            if(Posts.find().count() === 0){
                return noPostsToLoad;
            }

            // no more posts to load
            return false
        }

    }

});


Template.regularFeed.onDestroyed(function(){
    Session.set('mainPostsLoadLimit', MAIN_POSTS_LOAD_LIMIT);
    Session.set('mainPostsSERVERLoadLimit', SERVER_MAIN_POSTS_LOAD_LIMIT);
});
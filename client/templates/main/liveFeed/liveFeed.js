// get user followers array that contain ids;
var followArray = [], noPostsToLoad = "noPostsToLoad", hasPosts = 'hasPosts';


Template.liveFeed.onCreated(function(){

    Session.set('mainPostsLoadLimit', MAIN_POSTS_LOAD_LIMIT);

    followArray = Meteor.user().profile.follow;

    // critical for loader
    // need to know when to finish "loading"
    if(followArray) {
        //Subscribe to user followed posts
        for ( var i = 0; i < followArray.length; i++ ) {

            // User data
            this.posts = this.subscribe('usersFollowedByUser', followArray[i]);
            // Post data
            this.posts = this.subscribe('liveFeedPostsFollowedByUser', followArray[i], Session.get('mainPostsLoadLimit'));
        }
    }
    //subscribe to Meteor.user() posts.
    this.posts = this.subscribe('liveFeedPostsFollowedByUser', Meteor.userId(), Session.get('mainPostsLoadLimit'));

});

Template.liveFeed.events({
    'click #load-more': function() {
        // increase session post limit
        Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + MAIN_POSTS_INCRESE_LOAD_LIMIT);
    }
});

Template.liveFeed.helpers({
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
                Template.instance().posts = Template.instance().subscribe('liveFeedPostsFollowedByUser', followArray[i], Session.get('mainPostsLoadLimit'));
            }

        }
        //subscribe to Meteor.user() posts.
        Template.instance().posts = Template.instance().subscribe('liveFeedPostsFollowedByUser', Meteor.userId(), Session.get('mainPostsLoadLimit'));

        var postsList = Posts.find({},{limit: Session.get('mainPostsLoadLimit'), sort:{'createdAt.date': -1}});

        postsList.observeChanges({
            addedBefore: function(id, doc) {
                console.log(doc);
            }
        });

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
                return true;
            }
    },
    postsCount: function(){
        //check if need to show 'Load more posts' OR 'no more posts' OR 'no posts at all'.
        if(Posts.find().count() > Session.get('mainPostsLoadLimit')){
            return 'hasPosts'
        }else{
            if(Posts.find().count() === 0){
                return noPostsToLoad;
            }

            return false
        }
    }
});


Template.liveFeed.onDestroyed(function(){
    Session.set('mainPostsLoadLimit', MAIN_POSTS_LOAD_LIMIT);
});
var self;


Template.post.onCreated(function(){
    self = this;
    self.autorun(function(){
       self.subscribe("postCommentsCount", self.data._id);
    });
});

Template.post.onRendered(function(){
    //important to comment system!
    Session.set("commentForPost" + this.data._id, 5);
});

Template.post.events({
    'click .post-comments-button':function(event, t){
        $('.post-comments-wrap-' + this._id).show()
    },
    'click .like-button':function(){
        Meteor.call("likePost", this._id);
    },
    'click .liked':function(){
        Meteor.call("unlikePost", this._id);
    }
});

Template.post.helpers({
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
    numberOfComments:function(){
        console.log(Template.instance());
        var number_of_comment = Comments.find({postid: Template.instance().data._id}).count();
        return number_of_comment;
    },
    likedPost:function(){
        var likes = Meteor.user().profile.posts_events.liked_posts;

        if(likes)
            for(var i = 0; i < likes.length; i++){
                if(likes[i] === Template.instance().data._id) {
                    return true;
                }
            }

        return false;
    }
});

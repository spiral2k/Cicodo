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

    $('.post-options').dropdown({
        transition: 'drop'
    });

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
    },
    'click .share-button':function() {
        if (this.type === "share") {
            Meteor.call("sharePost", this.shared_post_id, function (error, result) {
                if (error) {
                    alert('Error');
                } else {
                    Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + 1);
                }
            });
        } else {
            Meteor.call("sharePost", this._id, function (error, result) {
                if (error) {
                    alert('Error');
                } else {
                    Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + 1);
                }
            });


        }
    },
    'click .deletePost': function(){

        console.log(this);

        Meteor.call("deletePost", this._id);

    },
    'mouseover .post-wrapper': function(e,template){

        console.log(template.find('.post-time'))
        $(template.find('.post-time')).hide();
        $(template.find('.post-options')).show();


    },
    'mouseout .post-wrapper': function(e,template){

        $(template.find('.post-time')).show();
        $(template.find('.post-options')).hide();


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
    },
    is_shared_post: function(){

        if(this.type === "share"){
            console.log("SHERED: ",this.shared_post_id);
            Meteor.subscribe("getOnePostById", this.shared_post_id);
            return true;

        }
        return false;
    },
    shared_post: function(){
        if(this.type === "share"){
            var post = Posts.find({_id: this.shared_post_id}).fetch();
                console.log("post: ", post);

            return post[0];
        }

    },
    userIsOwner:function(){
        return Meteor.userId() === this.createdBy;
    }
});

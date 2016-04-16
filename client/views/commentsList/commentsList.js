
Template.commentsList.helpers({
    comments: function(){
        Meteor.subscribe('postComments', this.postid);
        return Comments.find({postid: this.postid});
    }
});
Template.commentsList.helpers({
    comments: function(){
        Meteor.subscribe('postCommentsLimit', this.postid, Session.get("commentForPost" + this.postid)+ 5);
        var comments = Comments.find({postid: this.postid},{sort:{date:-1}, limit: Session.get("commentForPost" + this.postid)}).fetch();

        for(var i = 0; i < comments.length; i++){
            if(comments[i].user != Meteor.userId){
                Meteor.subscribe("usersFollowedByUser", comments[i].user);
            }
        }



        return comments
    },
    hasMoreComments:function(){
        var comment_count = Comments.find({postid: this.postid}).count();
        if(comment_count > Session.get("commentForPost" + this.postid))
            return true;
        return false;
    },
    hasMaxComments: function(){
        var comment_count = Comments.find({postid: this.postid}).count();
        if(comment_count <= Session.get("commentForPost" + this.postid) && comment_count > 5)
            return true;
        return false;
    }



});

Template.commentsList.events({
    'click .more-comments': function(){
        Session.set("commentForPost" + this.postid, Session.get("commentForPost" + this.postid) + 10);
        console.log(Session.get("commentForPost" + this.postid));
    },
    'click .reset-comments': function(){
        Session.set("commentForPost" + this.postid, Session.get("commentForPost" + this.postid) - Session.get("commentForPost" + this.postid) + 5);
    }
});
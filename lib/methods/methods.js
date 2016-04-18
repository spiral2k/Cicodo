Meteor.methods({
    'insertComment': function(comment, postid){
        Comments.insert({
            user: Meteor.userId(),
            date: new Date(),
            displayDate: moment().format("MMMM D, YYYY"),
            text: comment,
            postid: postid
        });
    }

});



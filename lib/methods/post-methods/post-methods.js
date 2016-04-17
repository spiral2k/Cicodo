Meteor.methods({
    'likePost': function(postID){

        Meteor.users.update({_id: Meteor.userId()},
            {
                $addToSet: {
                    "profile.posts_events.liked_posts": postID
                }
            });


        Posts.update(
            {_id: postID},
            { $inc: { likes: 1}}
        );

    },
    'unlikePost': function(postID){

        Meteor.users.update({_id: Meteor.userId()},
            {
                $pull: {
                    "profile.posts_events.liked_posts": postID
                }
            });

        Posts.update(
            {_id: postID},
            { $inc: { likes: -2}}
        );

    },
    'sharePost': function(postID){
        Meteor.users.update({_id: Meteor.userId()},
            {
                $addToSet: {
                    "profile.posts_events.shared_posts": postID
                }
            });

        Posts.insert({
            type: "share",
            shared_post_id:postID,
            content:"",
            createdAt: new Date(),
            createdBy: Meteor.userId(),
            likes: 0
        });

    },
    'insertPost' : function(content, createdAt){

        check(content, String);
        check(createdAt.date, Date);

        // get rid from html tags | replace <> with --
        content = content.replace(new RegExp(/(<([^>]+)>)/ig), "-$2-");

        var codeStartTagRegex = new RegExp(/-\s*code.*?-/gi);
        var codeStartTag = codeStartTagRegex.test(content);
        var codeEndTagRegex = new RegExp(/-\s*\/\s*code\s*.*?-/gi);
        var codeEndTag = codeEndTagRegex.test(content);

        if(codeStartTag && codeEndTag){
            content = content.replace(new RegExp(/-\s*code.*?-/gi),
                "<div class='code'>");
            content = content.replace(new RegExp(/-\s*\/\s*code\s*.*?-/gi),
                "\n</div>");
        }
        // get rid from html tags | replace <> with --
        content = content.replace(new RegExp(/(-([^-]+)-)/ig), "< $2>");

        Posts.insert({
            type: "regular",
            content:content,
            createdAt:createdAt,
            createdBy: Meteor.userId(),
            likes: 0
        });
    },
    'getSharedPostData':function(postID){
        return Posts.findOne({_id:postID});
    }

});
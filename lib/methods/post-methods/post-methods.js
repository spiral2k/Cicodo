Meteor.methods({
    'likePost': function(postID){

        Meteor.users.update({_id: Meteor.userId()},
            {
                $addToSet: {
                    "profile.posts_events.liked_posts": postID
                }
            });

        Posts.update({_id: postID},
            {
                $addToSet: {
                    "who_liked": Meteor.userId()
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

        Posts.update({_id: postID},
            {
                $pull: {
                    "who_liked": Meteor.userId()
                }
            });

        Posts.update(
            {_id: postID},
            { $inc: { likes: -2}}
        );

    },
    'sharePost': function(postID){


        var user = Meteor.users.findOne({_id: Meteor.userId()});
        var user_shared_posts = user.profile.posts_events.shared_posts;
        var user_already_shared_this_post = false;

        for(var i = 0; i < user_shared_posts.length; i++){
            if(user_shared_posts[i] === postID){
                user_already_shared_this_post = true;
                i = user_shared_posts.length;
            }
        }


        if(!user_already_shared_this_post) {

            Meteor.users.update({ _id: Meteor.userId() },
                {
                    $addToSet: {
                        "profile.posts_events.shared_posts": postID
                    }
                });

            Posts.update({ _id: postID },
                {
                    $addToSet: {
                        'who_shared': Meteor.userId()
                    }
                });

            Posts.update(
                { _id: postID },
                { $inc: { shares: 1 } }
            );

        }

        Posts.insert({
            type: "share",
            shared_post_id:postID,
            content:"",
            createdAt: new Date(),
            createdBy: Meteor.userId(),
            likes: 0,
            who_liked:[]
        });


    },
    'insertPost' : function(content){

        check(content, String);

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
            createdAt: new Date(),
            createdBy: Meteor.userId(),
            likes: 0,
            who_liked:[],
            shares: 0,
            who_shared:[]
        });


        Meteor.users.update(
            {_id : Meteor.userId()},
            { $inc:
                    {
                        "profile.posts_events.post_count": 1
                    }
            }
        );
        
        
        
        
        
    },
    'deletePost': function(postID){
        var post = Posts.findOne({_id: postID});

        if(Meteor.userId() === post.createdBy){
            console.log("POST OWNER");


            // delete likes from user liked array list
            if(post.who_liked)
                for(var i = 0; i < post.who_liked.length; i++){
                    console.log(post.who_liked[i]);
                    Meteor.users.update({_id: post.who_liked[i]},
                        {
                            $pull: {
                                "profile.posts_events.liked_posts": post._id
                            }
                        });
                }

            // delete shares from user shared array list
            if(post.who_shared)
                for(var i = 0; i < post.who_shared.length; i++){
                    console.log(post.who_shared[i]);
                    Meteor.users.update({_id: post.who_shared[i]},
                        {
                            $pull: {
                                "profile.posts_events.shared_posts": post._id
                            }
                        });
                }



            if(post.type === "share"){

                //Post actions
                var shared_post = Posts.findOne({_id: post.shared_post_id});
                var user_in_who_shared_list = false;

                if(shared_post.who_shared)
                    for(var i = 0; i < shared_post.who_shared.length ; i++){
                        if(shared_post.who_shared[i] === Meteor.userId()){
                            user_in_who_shared_list = true;
                            i = shared_post.who_shared.length;
                        }
                    }

                // decriment share count on the original post
                if(user_in_who_shared_list)
                    Posts.update(
                        {_id: post.shared_post_id},
                        { $inc: { shares: -1}}
                    );

                // delete user id from share list on the post array shared
                Posts.update({_id: post.shared_post_id},
                    {
                        $pull: {
                            who_shared: Meteor.userId()
                        }
                    });

                //User actions

                // Share
                Meteor.users.update({_id: Meteor.userId()}, {
                        $pull: {
                            "profile.posts_events.shared_posts": post.shared_post_id
                        }
                    });
                //like


            }

            Posts.remove({_id: post._id});
            Comments.remove({ postid: post._id });


            Meteor.users.update(
                {_id : Meteor.userId()},
                { $inc:
                {
                    "profile.posts_events.post_count": -1
                }
                }
            );


        }

    },
    'getSharedPostData':function(postID){
        return Posts.findOne({_id:postID});
    }

});
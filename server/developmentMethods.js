Meteor.methods({
    'deleteFollow': function(){

        Meteor.users.update(
            {_id : Meteor.userId()},
                {$unset:
                    {
                        "profile.follow":""
                    }
        });

        return true;
    },
    'removeAllPosts': function(){

        return Posts.remove({})

    }


});
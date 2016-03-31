Meteor.methods({
    'deleteFollow': function(){

        return Meteor.users.update(
            {_id : Meteor.userId()},
            {$unset:
            {
                "profile.follow":""
            }
            });
    },
    'removeAllPosts': function(){

        return Posts.remove({})
    },
    'removeAllMessages': function(){

        return Messages.remove({})
    }


});
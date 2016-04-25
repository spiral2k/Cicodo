Meteor.methods({
    'follow': function(userIdToFollow){

        if(! Meteor.user()){
            return;
        }

        Meteor.users.update(
            {_id : Meteor.userId()},
            {$addToSet:
            {
                "profile.follow":userIdToFollow
            }
            }
        );

        Meteor.users.update(
            {_id : userIdToFollow},
            {$addToSet:
            {
                "profile.followers":Meteor.userId()
            }
            }
        );

        return true;
    },

    'unfollow': function(userIdToUnfollow) {

        if(! Meteor.user()){
            return;
        }

        Meteor.users.update(
            {_id : Meteor.userId()},
            {$pull:
            {
                "profile.follow": userIdToUnfollow
            }
            }
        );

        Meteor.users.update(
            {_id : userIdToUnfollow},
            {$pull:
            {
                "profile.followers":Meteor.userId()
            }
            }
        );

    },
    updateCoverImage: function(pos, base64Cover){

        if(base64Cover) {
            Meteor.users.update(
                {_id: Meteor.userId()},
                {
                    $set: {
                        "profile.cover": base64Cover,
                        "profile.cover_position": pos
                    }
                }
            );
        }else{
            Meteor.users.update(
                {_id: Meteor.userId()},
                {
                    $set: {
                        "profile.cover_position": pos
                    }
                }
            );
        }

    }

});
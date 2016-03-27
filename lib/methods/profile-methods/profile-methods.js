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

    }

});
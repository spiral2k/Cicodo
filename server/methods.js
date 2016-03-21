Meteor.methods({
    'insertPost' : function(content, createdAt){

        console.log()

        if(typeof content != "string"){
            return false;
        }

        var userId = Meteor.userId();

        Posts.insert({
            content:content,
            createdAt:createdAt,
            createdBy: userId
        });
    },

    'updateProfile': function(aboutMe, privateProfile){

        console.log("updateProfile: ", aboutMe, privateProfile);


        Meteor.users.update(
            {_id : Meteor.userId()},
            {$set:
                {
                    "profile.about":aboutMe,
                    "profile.private": privateProfile
                }
            });

        return true;
    },

    'follow': function(userIdToFollow){

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
    }





});
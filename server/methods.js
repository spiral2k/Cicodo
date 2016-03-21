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

    'updateProfile': function(aboutMe, privateProfile, firstName, lastName){

        console.log("updateProfile: ", aboutMe, privateProfile);


        Meteor.users.update(
            {_id : Meteor.userId()},
            {$set:
                {
                    "profile.about":aboutMe,
                    "profile.private": privateProfile,
                    "profile.firstname": firstName,
                    "profile.lastname": lastName
                }
            });

        return true;
    },
    'followedUsersPosts': function(){

        console.log('calling followedUsersPosts');

        return Posts.find()
    }

});
Meteor.methods({
    'updateProfile': function (aboutMe, privateProfile, firstName, lastName, feedType, avatar) {

        console.log("updateProfile: ", feedType);

        aboutMe = aboutMe || "";
        privateProfile = privateProfile || "";
        firstName = firstName || "";
        lastName = lastName || "";
        feedType = feedType  || "";


        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $set: {
                    "profile.about": aboutMe,
                    "profile.private": privateProfile,
                    "profile.firstname": firstName,
                    "profile.lastname": lastName,
                    "profile.feedType": feedType,
                    "profile.avatar": avatar

                }
            });

        return true;
    },
    'followedUsersPosts': function () {

        console.log('calling followedUsersPosts');

        return Posts.find()
    }

});
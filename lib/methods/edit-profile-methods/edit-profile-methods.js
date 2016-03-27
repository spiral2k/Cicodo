Meteor.methods({
    'updateProfile': function (aboutMe, privateProfile, firstName, lastName, feedType, avatar, language) {

        aboutMe = aboutMe || "";
        privateProfile = privateProfile || "";
        firstName = firstName || "";
        lastName = lastName || "";
        feedType = feedType  || "";
        language = language || "en"


        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $set: {
                    "profile.about": aboutMe,
                    "profile.private": privateProfile,
                    "profile.firstname": firstName,
                    "profile.lastname": lastName,
                    "profile.feedType": feedType,
                    "profile.avatar": avatar,
                    "profile.language": language

                }
            });

        return true;
    },
    'followedUsersPosts': function () {

        console.log('calling followedUsersPosts');

        return Posts.find()
    }

});
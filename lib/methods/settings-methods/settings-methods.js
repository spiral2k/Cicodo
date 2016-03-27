Meteor.methods({
    'updateProfile': function (aboutMe, privateProfile, firstName, lastName, feedType, avatar, language) {

        language = language || "en";

        check(aboutMe, String);
        check(privateProfile, Boolean);
        check(firstName, String);
        check(lastName, String);
        check(feedType, String);
        check(language, String);
        check(avatar, String);

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
    }
});
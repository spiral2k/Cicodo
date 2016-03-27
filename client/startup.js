Meteor.startup(function () {

    Meteor.autorun(function(){

        var user = Meteor.user();

        if(Meteor.user()) {

            var lang = user.profile.language || "en";
            Session.set("Language", lang);

            TAPi18n.setLanguage(Session.get("Language"))
                .done(function () {
                    console.log("UI language is: " + Session.get("Language")+ " From JSON");
                })
                .fail(function (error_message) {
                    console.log("Problem to set language: " + error_message);
                });
        }
    });

});
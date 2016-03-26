Meteor.startup(function () {

    TAPi18n.setLanguage("fr")
        .done(function () {
            Session.set("showLoadingIndicator", false);
        })
        .fail(function (error_message) {
            // Handle the situation
            console.log(error_message);
        });

});
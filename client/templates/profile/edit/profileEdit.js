var user;

Template.profileEdit.onRendered(function(){

    ///////////////////////////////
    // get user setting from DB
    ///////////////////////////////

    // private-profile events, save state in session
    $(".private-profile").checkbox('setting', 'onChecked', function () {
        Session.set('private-profile', true);
    });

    $(".private-profile").checkbox('setting', 'onUnchecked', function () {
        Session.set('private-profile', false);
    });


    this.autorun(function() {
            if ( Meteor.user() ) {
                user = Meteor.user();

                $('#about-me').val(user.profile.about);

                $('#first-name').val(user.profile.firstname);

                $('#last-name').val(user.profile.lastname);

                if(user.profile.private)
                    $(".private-profile").checkbox('check');
                else{
                    $(".private-profile").checkbox('uncheck');
                }

            }
        }
    );

    // reset session var for form success
    Session.set('formSuccess', undefined);

});


Template.profileEdit.helpers({
    formSuccess: function() {
        var formSuccess = Session.get("formSuccess");
        return formSuccess;
    }
});

Template.profileEdit.events({
    'submit form': function(event, template){
        event.preventDefault();

        var privateProfile = Session.get('private-profile');

        var aboutMe = template.find('#about-me').value;


        var firstName = template.find('#first-name').value;

        var lastName = template.find('#last-name').value;


        Meteor.call('updateProfile', aboutMe, privateProfile, firstName, lastName, function(error, result){
            if(error){
                console.log("ERROR: Cant save profile setting!");
                return;
            }

            if(result){
                Session.set('formSuccess', "saved!");
                $('.success').show();
            }
        });
    },
    'click #discard-changes': function(){

        $('#about-me').val(user.profile.about);

        $('#first-name').val(user.profile.firstname);

        $('#last-name').val(user.profile.lastname);

        if(user.profile.private)
            $(".private-profile").checkbox('check');
        else{
            $(".private-profile").checkbox('uncheck');
        }

        return true;

    }
});

Template.profileEdit.onDestroyed(function(){

    // reset session var for form success
    Session.set('formSuccess', undefined);

});
Template.profileEdit.onRendered(function(){

    // private-profile
    $(".private-profile").checkbox('setting', 'onChecked', function () {
        Session.set('private-profile', true);
    });
    $(".private-profile").checkbox('setting', 'onUnchecked', function () {
        Session.set('private-profile', false);
    });

    // get user setting for DB
    this.autorun(function() {
            if ( Meteor.user() ) {

                var user = Meteor.user();

                $('#about-me').val(user.profile.about);

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

        var respond = Meteor.call('updateProfile', aboutMe, privateProfile, function(error, result){
            console.log("call ", error, result);


            if(error){
                console.log("ERROR: Cant save profile setting!");
                return;
            }

            if(result){
                Session.set('formSuccess', "saved!");
                $('.success').show();
            }
        });



    }

});
var user;

Template.profileEdit.onCreated(function(){
    // reset session var for form success
    Session.set('formSuccess', undefined);
});

Template.profileEdit.onRendered(function(){

    ///////////////////////////////
    // get user setting from DB
    ///////////////////////////////
    this.autorun(function() {

            if ( Meteor.user() ) {
                user = Meteor.user();
                setTemplateValue();
            }
        }
    );
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

        if(Meteor.user()){

            $('.save-settings').addClass('loading');

            var privateProfile = Session.get('private-profile');

            if(privateProfile === 'true'){
                privateProfile = true;
            }else{
                privateProfile = false;
            }

            var aboutMe = template.find('#about-me').value;

            var firstName = template.find('#first-name').value;

            var lastName = template.find('#last-name').value;

            // here the result is Array -- Letapel acharkach
            var feedType = $('#feedType').dropdown('get value');

            // here the result is Array -- Letapel acharkach

            var language = $('#language').dropdown('get value');

            Meteor.call('updateProfile', aboutMe, privateProfile, firstName, lastName, feedType[0], language[0], function(error, result){
                if(error){
                    console.log("ERROR: Cant save profile setting!");
                    return;
                }   $('.save-settings').removeClass('loading');
                    Session.set('formSuccess', "saved!");
                    $('.success').show();
            });


        }

    },
    'click #discard-changes': function(){
        setTemplateValue();
        return true;
    }
});

Template.profileEdit.onDestroyed(function(){
    // reset session var for form success
    Session.set('formSuccess', undefined);

});


function setTemplateValue(){
    $('#about-me').val(user.profile.about);

    $('#first-name').val(user.profile.firstname);

    $('#last-name').val(user.profile.lastname);

    $('#feedType').dropdown('set selected', user.profile.feedType);

    $('#language').dropdown('set selected', user.profile.language);

    if(user.profile.private)
        $(".private-profile").checkbox('check');
    else{
        $(".private-profile").checkbox('uncheck');
    }

    return true;
}

function eventsInit(){

    // private-profile events, save state in session
    $(".private-profile").checkbox('setting', 'onChecked', function () {
        Session.set('private-profile', true);
    });

    $(".private-profile").checkbox('setting', 'onUnchecked', function () {
        Session.set('private-profile', false);
    });


    $('#feedType').dropdown();
    $('#langugage').dropdown();
}
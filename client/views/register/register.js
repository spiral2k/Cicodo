Template.register.events({
    'submit form': function(event, template){
        event.preventDefault();
        Session.set("formErrors", false);

        var email = template.find('#email').value;
        var username = template.find('#username').value;
        var password = template.find('#password').value;


        //avatar
        var filesSelected = document.getElementById("avatarUpload").files;

        var avatar = null;

        if (filesSelected.length > 0)
        {
            avatar = $('#avatar img').attr('src');
        }

        Meteor.call('register',username, password, email, avatar, function(error, result) {

            console.log(error, result)

            if(error){
                console.log(error.reason);
                Session.set("formErrors", error.reason);
                return;
            }

            Meteor.loginWithPassword(username, password, function(error, result) {
                
                if (error) {
                    console.log(error.reason);
                    Session.set("formErrors", error.reason);
                    return;
                }

                FlowRouter.go('/');
            });


        });
    }
});




Template.register.helpers({
    formErrors: function() {
        var formErrors = Session.get("formErrors");
        return formErrors;
    }
});

Template.register.rendered = function(){

    // reset session var for form errors
    Session.set('formErrors', undefined);

   //Validation
    $('.loginForm').form({
        fields: {
            email: {
                identifier: 'email',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter your email.'
                    },{
                        type: 'email',
                        prompt: 'Please enter a valid email.'
                    }
                ]
            },
            username: {
                identifier: 'username',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter your username.'
                    },
                    {
                        type: 'length[3]',
                        prompt: 'Your username must be at least 3 characters.'
                    }
                ]
            },
            password: {
                identifier: 'password',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter your password.'
                    },
                    {
                        type: 'length[5]',
                        prompt: 'Your password must be at least 5 characters.'
                    }
                ]
            }
        }
    });

    document.getElementById("avatarUpload").addEventListener("change", Base64Avatar, false);
};


Template.register.onDestroyed(function(){

    // reset session var for form errors
    Session.set('formErrors', undefined);

});



Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();

        Session.set('formErrors', undefined);

        var email = template.find('#email').value;
        var password = template.find('#password').value;

        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
                Session.set("formErrors", error.reason);
            } else {
                FlowRouter.go('/home');
            }
        });
    }
});

Template.login.helpers({
    formErrors: function() {
        var formErrors = Session.get("formErrors");
        return formErrors;
    }
});

Template.login.rendered = function(){

    // reset session var for form errors
    Session.set('formErrors', undefined);

    $('.loginForm').form({
        fields: {
            email: {
                identifier: 'email',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter your username or email.'
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
                        type: 'length[6]',
                        prompt: 'Your password must be at least 6 characters.'
                    }
                ]
            }
        }
    });
};
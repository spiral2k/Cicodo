Template.register.events({
    'submit form': function(events, template){
        event.preventDefault();
        var email = template.find('#email').value;
        var username = template.find('#username').value;
        var password = template.find('#password').value;

        Accounts.createUser({
            email:email,
            username:username,
            password: password
        }, function(error){
            if(error){
                console.log(error.reason);
            } else {
                FlowRouter.go('/');
            }
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
};


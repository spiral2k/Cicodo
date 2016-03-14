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

        FlowRouter.go('/');
    }
});
Template.login.events({
    'submit form': function(events, template){
        event.preventDefault();
        var email = template.find('#email').value;
        var password = template.find('#password').value;

        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                FlowRouter.go('/');
            }
        });


    }
});
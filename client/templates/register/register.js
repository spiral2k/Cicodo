Template.register.events({
    'submit form': function(event, template){
        event.preventDefault();

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


        Accounts.createUser({
            email:email,
            username:username,
            password: password,
            profile:{
                avatar: avatar,
                private: EDIT_PROFILE_PRIVATE_PROFILE,
                about: EDIT_PROFILE_ABOUT,
                firstname:"",
                lastname:"",
                feedType: EDIT_PROFILE_FEED_TYPE,
                follow: [],
                followers:[],
                language:"en",
                // New
                notifications: [],
                open_messages:[],
                messages: []

            }
        }, function(error){
            if(error){
                console.log(error.reason);
                Session.set("formErrors", error.reason);
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

    document.getElementById("avatarUpload").addEventListener("change", Base64Avatar, false);
};


Template.register.onDestroyed(function(){

    // reset session var for form errors
    Session.set('formErrors', undefined);

});


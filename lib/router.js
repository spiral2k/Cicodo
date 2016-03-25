FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("Layout", {content: "main"});
    }
});


FlowRouter.route('/about', {
    action: function() {
        BlazeLayout.render("Layout", {content: "about"});
    }
});

FlowRouter.route('/register', {
    action: function() {
        BlazeLayout.render("Layout", {content: "register"});
    }
});


FlowRouter.route('/login', {
    action: function() {
        BlazeLayout.render("Layout", {content: "login"});
    }
});




FlowRouter.route('/profile/:username', {
action: function() {
        BlazeLayout.render("Layout", {content: "profile"});
    }
});

FlowRouter.route('/profile-edit', {
    action: function() {
        BlazeLayout.render("Layout", {content: "profileEdit"});
    }
});


// Not found

FlowRouter.route('/404', {
    action: function() {
        BlazeLayout.render("Layout", {content: "404"});
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render("Layout", {content: "404"});
    }
};



FlowRouter.route('/filestemp', {
    action: function() {
        BlazeLayout.render("Layout", {content: "filestemp"});
    }
});

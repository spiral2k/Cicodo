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
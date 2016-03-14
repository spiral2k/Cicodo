
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

FlowRouter.route('/sign-up', {
    action: function() {
        BlazeLayout.render("Layout", {content: "sign-up"});
    }
});


FlowRouter.route('/sign-in', {
    action: function() {
        BlazeLayout.render("Layout", {content: "sign-in"});
    }
});
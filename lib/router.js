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




FlowRouter.route('/@/:username', {
action: function() {
        BlazeLayout.render("Layout", {content: "profile"});
    }
});

FlowRouter.route('/settings', {
    action: function() {
        BlazeLayout.render("Layout", {content: "profileEdit"});
    }
});

FlowRouter.route('/messages', {
    action: function() {
        BlazeLayout.render("Layout", {content: "messages"});
    }
});



FlowRouter.route('/messages/:channel', {
    action: function() {
        BlazeLayout.render("Layout", {content: "messages"});
    }
});




// temp for development //

FlowRouter.route('/filestemp', {
    action: function() {
        BlazeLayout.render("Layout", {content: "filestemp"});
    }
});


FlowRouter.route('/loader', {
    action: function() {
        BlazeLayout.render("Layout", {content: "loader"});
    }
});

/////////////////////////////////////////////////////////////////////////

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



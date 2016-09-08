FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("WideLayout", {content: "main"});
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
        BlazeLayout.render("cleanLayout", {content: "profile"});
    }
});

FlowRouter.route('/@/:username/:postid', {
    action: function() {
        BlazeLayout.render("Layout", {content: "postView"});
    }
});

FlowRouter.route('/settings', {
    triggersEnter: [checkLoggedIn],
    action: function() {
        BlazeLayout.render("Layout", {content: "profileEdit"});
    }
});

FlowRouter.route('/messages', {
    name: "main-messages",
    triggersEnter: [checkLoggedIn],
    action: function() {
        BlazeLayout.render("cleanLayout", {content: "messages"});
    }
});

FlowRouter.route('/messages/:username', {
    name: "view-messages",
    triggersEnter: [checkLoggedIn],
    action: function() {
        BlazeLayout.render("cleanLayout", {content: "messages"});
    }
});

// temp for development //

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

function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) {
        redirect('/')
    }
}

Template.Layout.onCreated(function() {
        console.log("session: ", Session.get('currentURL'));
        Session.set('currentURL', window.location.href);
        console.log("window.location.href ", window.location.href);
    }
);

Template.Layout.events({
    'click': function(){
        setTimeout(function(){
            if(window.location.href != Session.get('currentURL')) {
                Session.set('currentURL', window.location.href);
            }
            console.log("session: ", Session.get('currentURL'));
            console.log("window.location.href ", window.location.href);
        }, 200)
    }
});

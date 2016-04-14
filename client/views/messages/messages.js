
Template.messages.onCreated(function(){
    var self = this;

    Session.set("messageUserName", null);

    self.autorun(function() {
        self.subscribe('usersListByID', Meteor.user().profile.open_messages);
    });
});


Template.messages.helpers({
    isMainMessages: function(){
        if(FlowRouter.current().route.path === '/messages'){
            return true;
        }
        return false;
    },
    usernames: function () {
                return Meteor.users.find({
                    '_id': { $in: Meteor.user().profile.open_messages }
                }, { fields: { 'username': 1, 'profile.avatar': 1, 'status.online': 1} }, function (err, docs) {
                    console.log("Template.messages.helpers: Error getting usernames ", docs);
                });
    },
    currentMessageUser:function(){
        if(this.username == Session.get("messageUserName")){
            return true;
        }
        return false;
    }
});

Template.messages.events({
    'click .messages-sidebar-user': function(){
        Session.set("messageUserName", this.username);
        FlowRouter.go('/messages/' + this.username)
        return true;
    },
    'keyup #user-messages-search': function(e){
        var value = $('#user-messages-search').val();
        $(".messages-sidebar-user").each(function() {
            if ($(this).find('.username-sidebar').text().search(new RegExp(value, "i")) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        return true;
    }
});
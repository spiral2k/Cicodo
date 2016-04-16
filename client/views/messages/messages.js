
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

        var userInTheList = false;
        if(FlowRouter.getParam('username')){

            var open_messages = Meteor.user().profile.open_messages;
            var username = FlowRouter.getParam('username');
            var user = Meteor.users.findOne({username: username});

            if(open_messages && user != undefined)
                for(var i = 0; i < open_messages.length; i++){
                    if(open_messages[i] === user._id) {
                        userInTheList = true;
                        console.log("User is in the list")
                    }
                }

            if(userInTheList) {
                return Meteor.users.find({
                    '_id': {$in: open_messages}
                }, {fields: {'username': 1, 'profile.avatar': 1, 'status.online': 1}}, function (err, docs) {
                    console.log("Template.messages.helpers: Error getting usernames ", docs);
                });
            }


            var users_list = Meteor.users.find({
                '_id': {$in: open_messages}
            }, {fields: {'username': 1, 'profile.avatar': 1, 'status.online': 1}}, function (err, docs) {
                console.log("Template.messages.helpers: Error getting usernames ", docs);
            }).fetch();


            if(user != undefined)
                users_list.unshift({
                    profile:{
                        avatar: user.profile.avatar
                    },
                    user_message_id: user._id,
                    username: user.username
                });

            return users_list;
        }

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

Template.messages.onCreated(function(){
    var self = this;

    Session.set("messageUserName", null);

    self.autorun(function() {
        if(Meteor.user()) {
            self.subscribe('usersListByID', Meteor.user().profile.open_messages);
        }
    });
});


Template.messages.helpers({
    isMainMessages:function(){

        FlowRouter.watchPathChange();

        var path = FlowRouter.current();

        console.log("path: ", path)

          if(path.path === "/messages"){
            return true;
          }

        return false

    },
    usernames:function(){
        if(Meteor.user()){

            var open_messages = Meteor.user().profile.open_messages;

            var users_list = Meteor.users.find({
                '_id': {$in: open_messages}
            }, {fields: {'username': 1, 'profile.avatar': 1, 'status.online': 1}}, function (err, docs) {
                console.log("Template.messages.helpers: Error getting usernames ", docs);
            }).fetch();


            if(FlowRouter.current().route.path === '/messages/:username'){

                var userInTheList = false;

                var username = FlowRouter.getParam('username');
                var user = Meteor.users.findOne({username: username});

                if(open_messages && user != undefined)
                    for(var i = 0; i < open_messages.length; i++){
                        if(open_messages[i] === user._id) {
                            userInTheList = true;
                            i = open_messages.length;
                        }
                    }

                if(!userInTheList){
                    Meteor.subscribe("getUserDataByUsername", username)
                        if(user != undefined)
                            users_list.unshift({
                                profile:{
                                    avatar: user.profile.avatar
                                },
                                user_message_id: user._id,
                                username: user.username
                            });
                }

            }
            //if we want that the first user in the users list will display what enter to  "/messages"
            //////////////////////////////////////////////////////////////////////////////////////////
            //if(FlowRouter.current().route.path === '/messages'){
            //    if(users_list && users_list.length > 0){
            //        Session.set("messageUserName", users_list[0].username);
            //        FlowRouter.go('/messages/' + users_list[0].username);
            //    }
            //}

            return users_list;

        }

    },
    no_users:function(){
        if(Meteor.user()){
            var open_messages = Meteor.user().profile.open_messages;

            if(open_messages.length > 0)
                return false;
            else
                return true

        }
    },
    currentMessageUser:function(){
        if(this.username == Session.get("messageUserName")){
            return true;
        }
        return false;
    },
    newMessages:function(){

            console.log("fwefew ", this);

        var messages = Meteor.user().profile.messages;

        for(var i = 0; i < messages.length; i++){
            if(messages[i].user_message_id === this._id){
                if(messages[i].new_messages > 0) {
                    return messages[i].new_messages;
                }
                else
                    return false;
            }

        }
        
    }
});


Template.messages.events({
    'click .messages-sidebar-user': function(){
        Session.set("messageUserName", this.username);
        FlowRouter.go('/messages/' + this.username);

        Meteor.call("resetNewMessagesInMessage", this.username);
        Meteor.call("updateUserMessagesPath", this.username);

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

Template.messages.onDestroyed(function() {
    Session.set("currentMessagesPath", null);
});
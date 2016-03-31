var username, userData, self;

// user that resive that message contexet session var
//Session.get("messageUserName");



Template.messages.onCreated(function(){

    self = this;

    self.autorun(function() {
        username = FlowRouter.getParam('username'); // Get the user username from the route parameter

        Session.set("messageUserName", username);

        self.subscribe('getUserDataByUsername', username);

        userData = Meteor.users.findOne({
                username: username
            }) || {};

        self.subscribe('usersListByID', Meteor.user().profile.open_messages);


        // need fix
        self.subscribe('messages');
    });
});



Template.messages.events({
    'click .messages-sidebar-user': function(){

        Session.set("messageUserName", this.username);
        FlowRouter.go('/messages/' + this.username);
        return true;
    },
    'keyup .textMessage': function(e) {

        var query_selector = $('.textMessage');
        var inputVal = query_selector.val();

        if(!!inputVal) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                e.stopPropagation();


                console.log("inputVal: ", inputVal);

                Meteor.call('newMessage', {
                    text: query_selector.val()
                },username);

                query_selector.val("");
                return false;
            }
        }
    }

});


Template.messages.helpers({
    isMainMessages:function(){
      // if username exist = not in main page
      if(!!username){
          return false;
      }
      return true;

    },
    usernames: function () {
        if(Template.instance().subscriptionsReady()) {
            return Meteor.users.find({
                '_id': { $in: Meteor.user().profile.open_messages }
            }, { fields: { 'username': 1, 'profile.avatar': 1 } }, function (err, docs) {
                console.log("Error getting usernames", docs);
            });
        }
    }
});
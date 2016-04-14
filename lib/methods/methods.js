Meteor.methods({
    'insertPost' : function(content, createdAt){

        check(content, String);
        check(createdAt.date, Date);

        // get rid from html tags | replace <> with --
        content = content.replace(new RegExp(/(<([^>]+)>)/ig), "-$2-");

        var codeStartTagRegex = new RegExp(/-\s*code.*?-/gi);
        var codeStartTag = codeStartTagRegex.test(content);
        var codeEndTagRegex = new RegExp(/-\s*\/\s*code\s*.*?-/gi);
        var codeEndTag = codeEndTagRegex.test(content);

        if(codeStartTag && codeEndTag){
                content = content.replace(new RegExp(/-\s*code.*?-/gi),
                    "<div class='code'>");
                content = content.replace(new RegExp(/-\s*\/\s*code\s*.*?-/gi),
                    "\n</div>");
        }
        // get rid from html tags | replace <> with --
        content = content.replace(new RegExp(/(-([^-]+)-)/ig), "< $2>");

        Posts.insert({
            content:content,
            createdAt:createdAt,
            createdBy: Meteor.userId()
        });
    },

    newMessage: function (message, username) {

        console.log(message, username);

        var userData = getUserMessagesDataFromUsername(username);

        if(typeof userData != "undefined") {

            message.timestamp = Date.now();
            message.send_to = userData._id;
            message.send_from = Meteor.userId();

            Messages.insert(message);

            Meteor.users.update(
                {_id: Meteor.userId()},
                {
                    $addToSet: {
                        "profile.open_messages": userData._id
                    }
                });

            Meteor.users.update(
                {_id: userData._id},
                {
                    $addToSet: {
                        "profile.open_messages": Meteor.userId()

                    }
                });

            //if user is offline
            if(userData.status.online){
                console.log("USER IS ONLINE");
                if(userData.profile.viewing_messages_of == Meteor.user().username){
                    noNeedNotification(userData, message);
                }else{
                    userNeedNotification(userData, message);
                }
            }else{
                console.log("USER IS OFFLINE");
                userNeedNotification(userData, message);
            }
        }

    },
    resetNewMessagesInMessage: function(username){
        var message_text, message_date;
        var user = Meteor.users.findOne({ "username": username });

        if(Meteor.user().profile.messages) {
            var userMessages = Meteor.user().profile.messages;

            for ( var i = 0; i < userMessages.length; i++ ) {

                if ( userMessages[i].user_message_id == user._id ) {
                    message_text = userMessages[i].last_message;
                    message_date = userMessages[i].last_message_time;
                }

            }

        Meteor.users.update(
            {_id: Meteor.userId()},
            {$pull: {'profile.messages': {user_message_id: user._id}}},{multi: true}
        );


        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $addToSet: {"profile.messages": {
                    user_message_id: user._id,
                    new_messages: 0,
                    last_message: message_text,
                    last_message_time: message_date
                }
                }
            });
        }

    },
    updateUserMessagesPath: function(viewingMessagesOfUser){
        Meteor.users.update({_id: Meteor.userId()},
            {$set: {'profile.viewing_messages_of': viewingMessagesOfUser}});
    }
});



function noNeedNotification(user_to, message){


    // remove before add new empty array cell = Meteor.user have no new messages DAAAA
    Meteor.users.update(
        {_id: Meteor.userId()},
        {$pull: {'profile.messages': {user_message_id: user_to._id}}},{multi: true}
    );


    // remove before add new empty array cell = Meteor.user have no new messages DAAAA
    Meteor.users.update(
        {_id: user_to._id},
        {$pull: {'profile.messages': {user_message_id: Meteor.userId()}}},{multi: true}
    );

    Meteor.users.update(
        {_id: Meteor.userId()},
        {
                $addToSet: {"profile.messages": {
                    user_message_id: user_to._id,
                    new_messages: 0,
                    last_message: prevText(message.text),
                    last_message_time: new Date()
                }
            }
        });

    Meteor.users.update(
        {_id: user_to._id},
        {
            $addToSet: {"profile.messages": {
                user_message_id: Meteor.userId(),
                new_messages: 0,
                last_message: prevText(message.text),
                last_message_time: new Date()
            }
            }
        });
}












function userNeedNotification(user_to, message){
    // remove before add new empty array cell = Meteor.user have no new messages DAAAA
    Meteor.users.update(
        {_id: Meteor.userId()},
        {$pull: {'profile.messages': {user_message_id: user_to._id}}},{multi: true}
    );




    // user that send the message
    Meteor.users.update(
        {_id: Meteor.userId()},
        {
            $addToSet: {"profile.messages": {
                user_message_id: user_to._id,
                new_messages: 0,
                last_message: prevText(message.text),
                last_message_time: new Date()
            }
            }
        });

    // user that will recive the message
    var newMessages;

    // get user_to data
    var user_to_data = Meteor.users.find(
        {_id: user_to._id},
        {fields: {'profile.messages': 1}}
    ).fetch();


    // search to find if the user is in the messages array and get the 'new_messages variable to incriment;
    var res =  _.findWhere(user_to_data[0].profile.messages, {
        user_message_id : Meteor.userId()
    }) || {};

    // if has result ind | if not the user have 1 new message
    if(!_.isEmpty(res) && res){
        newMessages = res.new_messages;
        newMessages += 1;
    }else{
        newMessages = 1;
    }

    console.log("user_to_data", user_to_data);
    console.log("user_to", user_to)
    console.log("res ", res);

    // remove previews array field
    Meteor.users.update(
        {_id: user_to._id},
        {$pull: {'profile.messages': {user_message_id: Meteor.userId()}}},{multi: true}
    );

    // insert new array field with the new data
    Meteor.users.update(
        {_id: user_to._id},
        {
            $addToSet: {"profile.messages": {
                user_message_id: Meteor.userId(),
                new_messages: newMessages,
                last_message: prevText(message.text),
                last_message_time: new Date()
            }
            }
        });


}

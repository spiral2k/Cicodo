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

        var user_to = getUserIdFromUsername(username);

        if(typeof user_to != "undefined") {

            message.timestamp = Date.now();
            message.send_to = user_to._id;
            message.send_from = Meteor.userId();

            Messages.insert(message);


            Meteor.users.update(
                {_id: Meteor.userId()},
                {
                    $addToSet: {
                        "profile.open_messages": user_to._id
                    }
                });

            Meteor.users.update(
                {_id: user_to._id},
                {
                    $addToSet: {
                        "profile.open_messages": Meteor.userId()

                    }
                });


            //if user is offline
            if(!user_to.status){
                console.log("USER IS OFFLINE");
                userNeedNotification(user_to);
            }else{
                console.log("USER IS ONLINE");
                noNeedNotification(user_to);
            }



        }

    }
});



function noNeedNotification(user_to){

    Meteor.users.update(
        {_id: Meteor.userId()},
        {
            $addToSet: {"profile.messages": {
                user_message_id: user_to._id,
                new_messages: 0
            }
            }
        });

    Meteor.users.update(
        {_id: user_to._id},
        {
            $addToSet: {"profile.messages": {
                user_message_id: Meteor.userId(),
                new_messages: 0
            }
            }
        });
}

function userNeedNotification(user_to){
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
                new_messages: 0
            }
            }
        });

    console.log("user_to: ", user_to);



    // user that will recive the message
    var newMessages;

    // get user_to data
    var user_to_data = Meteor.users.find(
        {_id: user_to._id},
        {'profile.messages': {user_message_id: Meteor.userId()}}
    ).fetch();


    console.log("user_to_data: ", user_to_data);

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

    console.log("res ", res);

    // remove previus array field
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
                new_messages: newMessages
            }
            }
        });


}

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
                    $addToSet: {"profile.messages": {
                        open_messages: user_to._id,
                        new_messages: 1
                    }
                    }
                });

            Meteor.users.update(
                {_id: user_to._id},
                {
                    $addToSet: {"profile.messages": {
                        open_messages: Meteor.userId(),
                        new_messages: 1
                    }
                    }

                });



        }







    }
});
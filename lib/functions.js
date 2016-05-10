
// post insert auto height
Autoheight = function autoheight(a) {
    if (!$(a).prop('scrollTop')) {
        do {
            var b = $(a).prop('scrollHeight');
            var h = $(a).height();
            $(a).height(h - 5);
        }
        while (b && (b != $(a).prop('scrollHeight')));
    }
    ;
    $(a).height($(a).prop('scrollHeight') + 20);
};


getUserIdFromUsername = function (username){
    return Meteor.users.findOne({username: username}, {fields:{ _id: 1, 'status.online':1}});
};


getUserStatusFromUsername = function (username){
    return Meteor.users.findOne({username: username}, {fields:{ _id: 0, 'status.online':1}});
};

getUserMessagesDataFromUsername = function (username){
    return Meteor.users.findOne({username: username}, {fields: {status: 1,
                                                                username: 1,
                                                                'profile.messages': 1,
                                                                'profile.viewing_messages_of': 1,
                                                                'profile.open_messages': 1
                                                                }});
};




prevText = function(text , n){
    n = n || 20;

    return (text.length > n) ? text.substr(0,n-1)+'...' : text;
};


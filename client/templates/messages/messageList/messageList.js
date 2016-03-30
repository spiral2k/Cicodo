
Meteor.subscribe('messages');

Template.messagesList.helpers({
        messages: Messages.find({})
    }
);


Template.messagesList.events({
    'keyup .textMessage': function(e) {
        var inputVal = $('.textMessage').val();
        if(!!inputVal) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                e.stopPropagation();
                Meteor.call('newMessage', {
                    text: $('.textMessage').val(),
                    channel: Session.get('channel')
                });
                $('.textMessage').val("");
                return false;
            }
        }
    }
});
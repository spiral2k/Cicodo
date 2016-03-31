Template.messagesView.helpers({
    messages: function(){
        console.log("user: ", userData);
        return Messages.find({send_to: userData._id});
    }
});
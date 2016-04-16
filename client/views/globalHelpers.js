Template.registerHelper("usernameFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId}) || {};
    if(!_.isEmpty(user))
        return user.username;
});

Template.registerHelper("messagesShortPreview", function (text) {
    if(text) {
        var n = 40;
        return (text.length > n) ? text.substr(0, n - 1) + '...' : text;
    }else{
        return "";
    }

});

Template.registerHelper("lastMessageByID", function (userId) {
    var last_message =  Meteor.users.find({
        '_id': Meteor.userId()
    }, { fields: { 'profile.messages': 1} }).fetch();

    last_message = last_message[0].profile.messages;

    for(var i = 0; i < last_message.length;i++){
        if(last_message[i].user_message_id == userId){
            return last_message[i].last_message;
        }
    }
    return;
});

Template.registerHelper("lastMessageTimeByID", function (userId) {

    var date, today;

    var last_message =  Meteor.users.find({
        '_id': Meteor.userId()
    }, { fields: { 'profile.messages': 1} }).fetch();

    last_message = last_message[0].profile.messages;

    for(var i = 0; i < last_message.length;i++){
        if(last_message[i].user_message_id == userId){
            date = last_message[i].last_message_time;
        }
    }
    if(date)
        today = (date.toDateString() === new Date().toDateString());

    if(today && date){
        return moment(date).format("HH:mm")

    }
    if(date)
        return moment(date).format("MMMM D, YYYY");

});

Template.registerHelper("avatarFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId}) || {};
    if(!_.isEmpty(user))
        return user.profile.avatar;
});


Template.registerHelper("timestampToTime", function (timestamp) {
    //var date = new Date(timestamp);
    //var hours = date.getHours();
    //var minutes = "0" + date.getMinutes();
    //var seconds = "0" + date.getSeconds();
    //return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);

    return moment(timestamp).format("HH:mm")


});
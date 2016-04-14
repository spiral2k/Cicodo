Template.message.helpers({
    userMessage: function(){
        if(this.user === Meteor.userId()){
            return true;
        }
        return false;
    }
});
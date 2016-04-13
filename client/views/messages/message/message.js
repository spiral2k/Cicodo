Template.message.helpers({
    userMessage: function(){


        console.log(this);
        console.log(this._id)       ;
        if(this.user === Meteor.userId()){
            return true;
        }

        return false;
    }
});
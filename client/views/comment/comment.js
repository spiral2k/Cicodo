Template.comment.helpers({
    avatar: function(){
        return Meteor.user().profile.avatar;
    }

});



Template.comment.events({
    'keyup #comment-text': function(e){
            e.preventDefault();


            console.log("fefef: ", this.postid);


            var query_selector = $('#comment-text');
            var inputVal = query_selector.val();

            if(!!inputVal.trim() && inputVal != "") {
                var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
                if (charCode == 13) {

                    Meteor.call('insertComment', inputVal, this.postid);
                    Session.set("commentForPost" + this.postid, Session.get("commentForPost" + this.postid) + 1);
                    query_selector.val("");
                    return true;
                }
            }

    }
});

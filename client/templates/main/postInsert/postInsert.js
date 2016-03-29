Template.postInsert.onRendered(function(){
    Autoheight($("#insert-posts-main"));

    $("#insert-posts-main").attr('style','height:65px');

});

Template.postInsert.events({
    'submit form': function(event, template){
        event.preventDefault();

        if(! Meteor.user()){
            return;
        }


        var content = template.find("#insert-posts-main").value;

        if(content.trim() === ""){
            return;
        }

        var lines = $('#insert-posts-main').val().split('\n');

        content = "";

        for(var i = 0;i < lines.length;i++){
            content +=  "\n" + lines[i];
        }

        var createdAt = {
            date: new Date(),
            day: moment().format("D"),
            month:  moment().format("M"),
            year: moment().format("YYYY"),
            displayDate: moment().format("MMMM D, YYYY"),
            hour: moment().format("H:mm")
        };

        Meteor.call('insertPost', content, createdAt );

        // all the posts that the user can see + the post that he submited
        Session.set('mainPostsLoadLimit', Session.get('mainPostsLoadLimit') + 1);

        template.find("#insert-posts-main").value = "";
    },
    'keydown #insert-posts-main': function(){

        Autoheight($("#insert-posts-main"));

        if($("#insert-posts-main").val() === ""){
            $("#insert-posts-main").attr('style','height:65px');
        }

    }
});

Template.postInsert.helpers({
    avatar: function(){
        return Meteor.user().profile.avatar;
    }
});



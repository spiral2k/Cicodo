Template.postInsert.onRendered(function(){
    Autoheight($("#insert-posts-main"));
    tabEnabled('insert-posts-main');
    $("#insert-posts-main").attr('style','height:65px');

});

Template.postInsert.events({
    'submit form': function(event, template){
        event.preventDefault();

        if(! Meteor.user()){
            return;
        }


        var content = template.find("#insert-posts-main").value;

        var lines = content.split('\n');
        content = "";
        for(var i = 0;i < lines.length;i++){
            content +=  "\n" + lines[i];
        }

        if(content.trim() === ""){
            return;
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

        tabEnabled('insert-posts-main');

        if($("#insert-posts-main").val() === "" || $("#insert-posts-main").val() === " "){
            $("#insert-posts-main").attr('style','height:65px');
        }
    }

});

Template.postInsert.helpers({
    avatar: function(){
        return Meteor.user().profile.avatar;
    }
});





function tabEnabled(id){
    var el = document.getElementById(id);
    el.onkeydown = function(e) {
        if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;

        }
    };
}
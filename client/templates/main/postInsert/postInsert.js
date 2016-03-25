Template.postInsert.events({
    'submit form': function(event, template){
        event.preventDefault();

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
    'keyup #insert-posts-main': function(){
        autoheight($("#insert-posts-main"));
    }


});

Template.postInsert.onRendered(function(){
    autoheight($("#insert-posts-main"));
});


function autoheight(a) {

    if (!$(a).prop('scrollTop')) {
        do {
            var b = $(a).prop('scrollHeight');
            var h = $(a).height();
            $(a).height(h - 5);
        }
        while (b && (b != $(a).prop('scrollHeight')));
    };
    $(a).height($(a).prop('scrollHeight') + 20);
}
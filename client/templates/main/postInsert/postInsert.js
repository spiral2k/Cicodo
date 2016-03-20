Template.postInsert.events({
    'submit form': function(event, template){
        event.preventDefault();

        var content = template.find("#postInput").value;

        if(content.trim() == ""){
            return;
        }

        var lines = $('#postInput').val().split('\n');

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

        template.find("#postInput").value = "";
    }


});

Template.postInsert.helpers({

});
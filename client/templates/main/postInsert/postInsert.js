Template.postInsert.events({
    'submit form': function(event, template){
        event.preventDefault();

        var content = template.find("#postInput").value;

        if(content.trim() == ""){
            return;
        }


        var lines = $('#postInput').val().split('\n');
        console.log(lines.length);

        content = "";

        for(var i = 0;i < lines.length;i++){
            content +=  "\n" + lines[i];
        }

        var userId = Meteor.userId();

        var createdAt = {
            date: new Date(),
            day: moment().format("D"),
            month:  moment().format("M"),
            year: moment().format("YYYY"),
            displayDate: moment().format("MMMM D, YYYY"),
            hour: moment().format("H:mm")
        };

        console.log(content, " ", userId, " ", createdAt);

        Posts.insert({
            content:content,
            createdAt:createdAt,
            userId: userId
        });

        template.find("#postInput").value = "";
    }


});

Template.postInsert.helpers({

});
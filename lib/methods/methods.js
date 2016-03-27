Meteor.methods({
    'insertPost' : function(content, createdAt){

        if(typeof content != "string" || ! Meteor.user()){
            return false;
        }

        check(content, String);
        check(createdAt.date, Date);

        var userId = Meteor.userId();

        Posts.insert({
            content:content,
            createdAt:createdAt,
            createdBy: userId
        });
    }
});
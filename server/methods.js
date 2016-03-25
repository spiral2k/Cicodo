Meteor.methods({
    'insertPost' : function(content, createdAt){

        if(typeof content != "string"){
            return false;
        }

        var userId = Meteor.userId();

        Posts.insert({
            content:content,
            createdAt:createdAt,
            createdBy: userId
        });
    }
});
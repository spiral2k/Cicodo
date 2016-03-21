Template.developmentTools.events({
    'click #clearFollows': function(){
            Meteor.call('deleteFollow');
    },
    'click #removeAllPosts': function(){
        Meteor.call('removeAllPosts')
    }
});
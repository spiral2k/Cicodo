Meteor.methods({
    'navbar-search': function (query) {

        var search = [];

        search.push({username: { $regex : query} });

        return Meteor.users.find(
            search[0]
            ,{limit: 5}).fetch();

    }
});
Template.navbarSearch.onCreated(function(){
    Session.set('searchHasResults', null);
});


Template.navbarSearch.onRendered(function(){
    $(document).mouseup(function (e)
    {
        var container = $(".navbar-search-wrap");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            Session.set('searchHasResults', null);
        }
    });

});


Template.navbarSearch.events({

    'focus  input':function(event){
        var query = $('#navbar-search').val();

        if(query.length > 1){

            $('.navbar-search-wrap .input').addClass('loading');

            Meteor.call('navbar-search', query, function(error, result){

                if(error){
                    console.log("Navbar Search Error: ", error.reason);
                    return;
                }

                Session.set('searchHasResults', result);

                $('.navbar-search-wrap .input').removeClass('loading');

            });
        }

    },
    'keyup input': function(event) {

        var query = $('#navbar-search').val();

        Session.set('searchHasResults', null);

        if(query.length > 1) {

            $('.navbar-search-wrap .input').addClass('loading');

            Meteor.call('navbar-search', query, function(error, result){

                if(error){
                    console.log("Navbar Search Error: ", error.reason);
                    return;
                }

                Session.set('searchHasResults', result);

                $('.navbar-search-wrap .input').removeClass('loading');

            });
        }

    },
    'click .searchQuery': function(event){
        $('#navbar-search').val("");
        Session.set('searchHasResults', null);
    }
});

Template.navbarSearch.helpers({
    searchHasResults: function(){
        return Session.get('searchHasResults');
    }
});


Template.navbarSearch.onDestroyed(function(){
    Session.set('searchHasResults', null);
});
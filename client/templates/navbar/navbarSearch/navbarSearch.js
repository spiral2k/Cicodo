Template.navbarSearch.onRendered(function(){

    Session.set('searchHasResults', null);

    $(document).mouseup(function (e)
    {
        var container = $(".navbar-search-wrap");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
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
                    console.log(error.reason);
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
                    console.log(error.reason);
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
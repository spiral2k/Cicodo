
Template.profile.onCreated(function() {

    Session.set("profileEdit", false);
    Session.set("coverEdit", false);
    Session.set("CoverImageBase64", false);
    Session.set("CoverPosition", false);
    Session.set("photoEdit", false);
    Session.set("profileCurrentPage", "posts");
    Session.set("coverPositionEdit", false);
    Session.set("postsLimit", 5);
    Session.set("postsLoadLimit", 10);


    var self = this;

        //////////////////////////////////////////////////////////////////////
        // Get information about the user that the profile belong to him
        //////////////////////////////////////////////////////////////////////
        var username = FlowRouter.getParam('username');
        self.subscribe('getUserProfileDataByUsername', username);
        self.subscribe('getUserPostsByUsername', username, Session.get("postsLoadLimit"));


});


Template.profile.onRendered(function(){
    var username = FlowRouter.getParam('username');
    Template.instance().subscribe('getUserPostsByUsername', username, 5, function(){
        Tracker.afterFlush(function () {
                $('#profile-cover-image').backgroundDraggable({bound: false, axis: 'y'});
        });
    });


    $("body").on('change','#CoverUpload' , function(){

        var filesSelected = document.getElementById("CoverUpload").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64

                Session.set("CoverImageBase64", srcData);
                $("#profile-cover-image").attr("style", "background-image: url(" + srcData + ")");

            };

            fileReader.readAsDataURL(fileToLoad);
        }

    });


    $("body").on('change','#avatarUpload' , function(){

        var filesSelected = document.getElementById("avatarUpload").files;

        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64

                $(".user-profile-avatar").attr("style", "background-image: url(" + srcData + "); background-size: 100% 100%;");



                Meteor.call("updateProfileImage", srcData);

                Session.set("profileEdit", false);
                Session.set("photoEdit", false);

            };

            fileReader.readAsDataURL(fileToLoad);
        }

    });




});

Template.profile.helpers({
    userProfileData: function() {

        username = FlowRouter.getParam('username');

        userData = Meteor.users.findOne({
                username: username
            }) || {};
        // Followers
        if(userData.profile.followers)
            Meteor.subscribe('usersListByID', userData.profile.followers);

        // Following
        if(userData.profile.follow)
            Meteor.subscribe('usersListByID', userData.profile.follow);

        if( _.isEmpty(userData)){
            FlowRouter.go('/404')
        }


        if(userData._id == Meteor.userId()){
            userData.userProfile = true;
        }

        return userData;
    },
    posts: function(){
        var username = FlowRouter.getParam('username');
        var user = Meteor.users.findOne({'username': username});

        Meteor.subscribe('getUserPostsByUsername', username, Session.get("postsLoadLimit"));

        return Posts.find({createdBy: user._id}, {limit: Session.get("postsLimit"), sort:{'createdAt': -1}});
    },
    isUserFollowing: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        //////////////////////////////////////////////////////////////////////
        // Get information about the user that viewing the profile | if following user
        //////////////////////////////////////////////////////////////////////

        // get user following ID's
        var viewUser = Meteor.user();

        if(viewUser) {
            var follows = viewUser.profile.follow;
        }

        // get the profile user ID
        var userProfileId = userData._id;

        // search if user is following the profile user

        var isTheUserFollowing = _.some(follows, function(id) {
            return id == userProfileId;
        });

        return isTheUserFollowing

        return false;
    },
    followersCount: function(){
        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        if(userData.followers || !_.isEmpty(userData))
            return userData.profile.followers.length;
        else return 0
    },
    followingCount: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        if(typeof userData.follow !== "undefined" || !_.isEmpty(userData))
            return userData.profile.follow.length;
        else return 0
    },
    followersData: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        var followerUsers = Meteor.users.find({
            '_id': { $in: userData.profile.followers}
        },{fields: {'username': 1, 'profile.avatar': 1}}, function(err, docs){
            console.log(docs);
        });

        return followerUsers;
    },
    followsData: function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        var followsUsers = Meteor.users.find({
            '_id': { $in: userData.profile.follow}
        },{fields: {'username': 1, 'profile.avatar': 1}}, function(err, docs){
            console.log(docs);
        });

        return followsUsers;
    },
    profileEdit: function(){

        return Session.get("profileEdit");


    },
    coverEdit: function(){
        return Session.get("coverEdit");
    },
    currentIsPosts: function(){

        if(Session.get("profileCurrentPage") === "posts"){
            return true
        }

        return false;

    },
    currentIsFollowing: function(){
        if(Session.get("profileCurrentPage") === "following"){
            return true
        }

        return false;
    },
    currentIsFollowers: function(){
        if(Session.get("profileCurrentPage") === "followers"){
            return true
        }

        return false;
    },
    photoEdit: function(){
        return Session.get("photoEdit");
    },
    coverPositionEdit:function(){
        return Session.get("coverPositionEdit");
    },
    postsCount: function(){
        //check if need to show 'Load more posts' OR 'no more posts' OR 'no posts at all'.
        if(Posts.find().count() > Session.get('postsLimit')){
            return 'hasPosts'
        }else{
            var username = FlowRouter.getParam('username');
            var user = Meteor.users.findOne({'username': username});

            if(Posts.find({createdBy: user._id}).count() === 0){
                return 'noPostsToLoad';
            }

            return false
        }
    }
});



Template.profile.events({
    'click .profile-posts': function(event, t){
        $('.ui .item').removeClass('active');
        $(event.target).addClass('active');
        Session.set("profileCurrentPage", "posts");
    },
    'click .profile-following': function(event, t){
        $('.ui .item').removeClass('active');
        $(event.target).addClass('active');
        Session.set("profileCurrentPage", "following");
    },
    'click .profile-followers': function(event, t){
        $('.ui .item').removeClass('active');
        $(event.target).addClass('active');
        Session.set("profileCurrentPage", "followers");
    },
    'click #follow-user': function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        Meteor.call('follow',userData._id);
        return true;
    },
    'click #unfollow-user': function(){

        var username = FlowRouter.getParam('username');
        var userData = Meteor.users.findOne({
                username: username
            }) || {};

        Meteor.call('unfollow', userData._id);

        return true;
    },
    'mouseenter .user-edit-avatar':function(){
        $('.edit-avatar-mask').show();
    },
    'mouseleave .user-edit-avatar':function(){
        $('.edit-avatar-mask').hide();
    },
    'click .profileEdit': function(){
        Session.set("profileEdit", true);
    },
    'click .finishEditProfile': function(){
        Session.set("profileEdit", false);
        Session.set("photoEdit", false);
        Session.set("coverPositionEdit", false);
    },
    'click .cover-image-edit-block': function(){
        Session.set("coverEdit", true);
    },
    'click .cancelCoverEdit': function(){

        $("#profile-cover-image").attr("style", "background-image: url(" + Meteor.user().profile.cover + "); background-position-y: "+ Meteor.user().profile.cover_position + "px");

        Session.set("CoverImageBase64", false);
        Session.set("coverEdit", false);
        Session.set("coverPositionEdit", false);
    },
    'click .finishCoverEdit': function(){

        Session.set("coverEdit", false);
        Session.set("coverPositionEdit", false);

        var pos = Session.get("CoverPosition");

        if(Session.get("CoverImageBase64")) {
            Meteor.call("updateCoverImage", pos, Session.get("CoverImageBase64"));
        }
        if(Meteor.user().profile.cover_position !== pos){
            Meteor.call("updateCoverImage", pos);
        }
    },
    'click .profile-image-edit-block': function(){
        Session.set("photoEdit", true);
    },
    'click .positionCoverEdit': function(){
        Session.set("coverPositionEdit", true);
    },
    'click #load-more-posts': function(event){
        event.preventDefault();

        // increase session post limit
        Session.set('postsLoadLimit', Session.get('postsLoadLimit') + MAIN_POSTS_INCRESE_LOAD_LIMIT);
        Session.set('postsLimit', Session.get('postsLimit') + MAIN_POSTS_INCRESE_LOAD_LIMIT);

    }

});


Template.profile.onDestroyed(function(){
    Session.set("profileEdit", false);
    Session.set("coverEdit", false);
    Session.set("CoverImageBase64", false);
    Session.set("profileCurrentPage", null);
    Session.set("CoverPosition", false);
    Session.set("photoEdit", false);
    Session.set("coverPositionEdit", false);
    Session.set("postsLimit", 5);
    Session.set("postsLoadLimit", 10);
});

/* DRAG */
;(function($) {
    var $window = $(window);

    // Helper function to guarantee a value between low and hi unless bool is false
    var limit = function(low, hi, value, bool) {
        if (arguments.length === 3 || bool) {
            if (value < low) return low;
            if (value > hi) return hi;
        }
        return value;
    };

    // Adds clientX and clientY properties to the jQuery's event object from touch
    var modifyEventForTouch = function(e) {
        e.clientX = e.originalEvent.touches[0].clientX;
        e.clientY = e.originalEvent.touches[0].clientY;
    };

    var getBackgroundImageDimensions = function($el) {
        var bgSrc = ($el.css('background-image').match(/^url\(['"]?(.*?)['"]?\)$/i) || [])[1];
        if (!bgSrc) return;

        var imageDimensions = { width: 0, height: 0 },
            image = new Image();

        image.onload = function() {
            if ($el.css('background-size') == "cover") {
                var elementWidth = $el.innerWidth(),
                    elementHeight = $el.innerHeight(),
                    elementAspectRatio = elementWidth / elementHeight;
                imageAspectRatio = image.width / image.height,
                    scale = 1;

                if (imageAspectRatio >= elementAspectRatio) {
                    scale = elementHeight / image.height;
                } else {
                    scale = elementWidth / image.width;
                }

                imageDimensions.width = image.width * scale;
                imageDimensions.height = image.height * scale;
            } else {
                imageDimensions.width = image.width;
                imageDimensions.height = image.height;
            }
        };

        image.src = bgSrc;

        return imageDimensions;
    };

    function Plugin(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    Plugin.prototype.init = function() {
        var $el = $(this.element),
            bgSrc = ($el.css('background-image').match(/^url\(['"]?(.*?)['"]?\)$/i) || [])[1],
            options = this.options;

        if (!bgSrc) return;

        // Get the image's width and height if bound
        var imageDimensions = { width: 0, height: 0 };
        if (options.bound) {
            imageDimensions = getBackgroundImageDimensions($el);
        }

        $el.on('mousedown.dbg touchstart.dbg', function(e) {

            console.log(e.target)

            if (!$(e.target).is(".profile-edit-cover-position-mask")) {
                return;
            }
            e.preventDefault();

            if (e.originalEvent.touches) {
                modifyEventForTouch(e);
            } else if (e.which !== 1) {
                return;
            }

            var x0 = e.clientX,
                y0 = e.clientY,
                pos = $el.css('background-position').match(/(-?\d+).*?\s(-?\d+)/) || [],
                xPos = parseInt(pos[1]) || 0,
                yPos = parseInt(pos[2]) || 0;

            $window.on('mousemove.dbg touchmove.dbg', function(e) {
                e.preventDefault();

                if (e.originalEvent.touches) {
                    modifyEventForTouch(e);
                }

                var x = e.clientX,
                    y = e.clientY;

                xPos = options.axis === 'y' ? xPos : limit($el.innerWidth()-imageDimensions.width, 0, xPos+x-x0, options.bound);
                yPos = options.axis === 'x' ? yPos : limit($el.innerHeight()-imageDimensions.height, 0, yPos+y-y0, options.bound);
                x0 = x;
                y0 = y;




                    Session.set("CoverPosition", yPos);
                    $el.css('background-position', xPos + 'px ' + yPos + 'px');

            });

            $window.on('mouseup.dbg touchend.dbg mouseleave.dbg', function() {
                if (options.done) {
                    options.done();
                }

                $window.off('mousemove.dbg touchmove.dbg');
                $window.off('mouseup.dbg touchend.dbg mouseleave.dbg');
            });
        });
    };

    Plugin.prototype.disable = function() {
        var $el = $(this.element);
        $el.off('mousedown.dbg touchstart.dbg');
        $window.off('mousemove.dbg touchmove.dbg mouseup.dbg touchend.dbg mouseleave.dbg');
    }

    $.fn.backgroundDraggable = function(options) {
        var options = options;
        var args = Array.prototype.slice.call(arguments, 1);



            return this.each(function () {
                var $this = $(this);

                if (typeof options == 'undefined' || typeof options == 'object') {
                    options = $.extend({}, $.fn.backgroundDraggable.defaults, options);
                    var plugin = new Plugin(this, options);
                    $this.data('dbg', plugin);
                } else if (typeof options == 'string' && $this.data('dbg')) {
                    var plugin = $this.data('dbg');
                    Plugin.prototype[options].apply(plugin, args);
                }
            });

    };

    $.fn.backgroundDraggable.defaults = {
        bound: true,
        axis: undefined
    };
}(jQuery));
Meteor.methods({
    'insertComment': function(comment, postid){
        Comments.insert({
            user: Meteor.userId(),
            date: new Date(),
            displayDate: moment().format("MMMM D, YYYY"),
            text: comment,
            postid: postid
        });
    },
    'register': function(username, password, email, avatar){

        return Accounts.createUser({
            email:email,
            username:username,
            password: password,
            profile:{
                avatar: avatar,
                private: EDIT_PROFILE_PRIVATE_PROFILE,
                about: EDIT_PROFILE_ABOUT,
                firstname:"",
                lastname:"",
                feedType: EDIT_PROFILE_FEED_TYPE,
                follow: [],
                followers:[],
                language:"en",
                // New
                notifications: [],
                open_messages:[],
                messages: [],
                viewing_messages_of: null,
                posts_events:{
                    liked_posts:[],
                    shared_posts:[]
                },
                cover: "/images/cover/background.jpg",
                cover_position:0
            }
        });

        console.log("userCreate: ", userCreate);

    }
});



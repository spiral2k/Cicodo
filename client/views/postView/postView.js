Template.postView.onCreated(function(){
    self = this;
    self.autorun(function(){

        var postid = FlowRouter.getParam('postid');
        self.subscribe("getOnePostById", postid);

    });


});



Template.postView.helpers({
   postData: function(){

   		

       var postid = FlowRouter.getParam('postid');

       return Posts.findOne({_id: postid});

   }
});
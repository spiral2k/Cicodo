Template.navbar.onRendered(function(){

	Meteor.autorun(function() {

	  FlowRouter.watchPathChange();
	  var currentContext = FlowRouter.current();
	  var user = Meteor.user() || {};
		
	  if(currentContext.path === "/home" && JSON.stringify(user) === "{}")
		       FlowRouter.go('/');

	});
});

Template.navbar.events({
	"click #navbar-logo": function(){
		if(Meteor.user())
			 FlowRouter.go('/home');
		else
			 FlowRouter.go('/');
	}
})
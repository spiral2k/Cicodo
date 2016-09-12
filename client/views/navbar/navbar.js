Template.navbar.events({
	"click #navbar-logo": function(){
		if(Meteor.user())
			 FlowRouter.go('/home');
		else
			 FlowRouter.go('/');
	}
})
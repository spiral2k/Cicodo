Template.mainUser.onRendered(function(){
		var path = FlowRouter._current.path;
		var user = Meteor.user() || {};


		if(path === "/" && JSON.stringify(user) !== "{}")
			FlowRouter.go('/home');

})
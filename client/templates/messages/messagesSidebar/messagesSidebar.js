Meteor.subscribe('channels');

Meteor.startup(function() {
    Session.set('channel', 'general');
});

Template.messagesSidebar.helpers({
    channels: function () {
        return Channels.find();
    }
});
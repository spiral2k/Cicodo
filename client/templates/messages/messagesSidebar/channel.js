
Template.channel.events({
    'click .channel': function (e) {
        console.log("this.name: ",this.name);
        Session.set('channel', this.name);
    }
});

Template.channel.helpers({
    active: function () {
        if (Session.get('channel') === "") {
            return "active";
        } else {
            return "";
        }
    }
});
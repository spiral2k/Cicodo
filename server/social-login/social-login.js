ServiceConfiguration.configurations.remove({
    service: 'github'
});

ServiceConfiguration.configurations.insert({
    service: 'github',
    clientId: Meteor.settings.private.github.clientId,
    secret: Meteor.settings.private.github.secret
});
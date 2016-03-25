Files = new FS.Collection("files", {
    stores: [new FS.Store.FileSystem("files", {path: '/Projects/Meteor/social-network/public/uploads/'})]
});


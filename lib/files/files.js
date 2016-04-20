var profileCoverStore = new FS.Store.FileSystem('eventPhotos', {
    path: Meteor.absolutePath +  '/uploads'
});

profileCover = new FS.Collection('profileCover', {
    stores: [profileCoverStore]
});

profileCover.allow({
    'insert': function () {
        console.log(Meteor.absolutePath);
        console.log(Meteor.rootPath);
        // add custom authentication code here
        return true;
    },
    'update': function () {
        console.log(Meteor.absolutePath);
        console.log(Meteor.rootPath);
        // add custom authentication code here
        return true;
    }
});
var ImagesStore = new FS.Store.FileSystem('eventPhotos', {
    path: Meteor.absolutePath +  '/public/uploads'
});



Images = new FS.Collection('eventPhotos', {
    stores: [ImagesStore]
});

Images.allow({
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
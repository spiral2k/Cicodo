
var createThumb = function(fileObj, readStream, writeStream) {
    // Transform the image into a 50x50px thumbnail
    gm(readStream, fileObj.name()).resize('50', '50').stream().pipe(writeStream);
};


profileCover = new FS.Collection('profileCover', {
    stores: [
        new FS.Store.FileSystem('eventPhotos', {
            path: Meteor.absolutePath +  '/uploads/profileCovers'
        }),
        new FS.Store.FileSystem("thumbs", { transformWrite: createThumb })]
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


profileCover.allow({
    insert:function(userId,project){
        console.log("insert: ", userId,project);
        return true;
    },
    update:function(userId,project,fields,modifier){
        console.log("update: ", userId,project);
        return true;
    },
    remove:function(userId,project){
        console.log("remove: ", userId,project);
        return true;
    },
    download:function(){
        return true;
    }
});
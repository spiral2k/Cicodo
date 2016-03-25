Template.filestemp.events({
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Files.insert(file, function (err, fileObj) {

                console.log( file, err, fileObj)


                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
        });
    }
});
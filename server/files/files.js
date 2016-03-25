Files.allow({
    'insert': function () {
        // add custom authentication code here
        return true;
    },
    'update': function () {
        // add custom authentication code here
        return true;
    }
});

Files.deny({
    'insert': function () {
        // add custom authentication code here
        return false;
    },
    'update': function () {
        // add custom authentication code here
        return false;
    }
})
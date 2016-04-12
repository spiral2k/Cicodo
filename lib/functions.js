// base64 convert function
Base64Avatar = function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("avatarUpload").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            var newImage = document.createElement('img');
            newImage.src = srcData;

            document.getElementById("avatar").innerHTML = newImage.outerHTML;

        };

        fileReader.readAsDataURL(fileToLoad);
    }

};

// post insert auto height
Autoheight = function autoheight(a) {
    if (!$(a).prop('scrollTop')) {
        do {
            var b = $(a).prop('scrollHeight');
            var h = $(a).height();
            $(a).height(h - 5);
        }
        while (b && (b != $(a).prop('scrollHeight')));
    }
    ;
    $(a).height($(a).prop('scrollHeight') + 20);
};


getUserIdFromUsername = function (username){
    return Meteor.users.findOne({username: username}, {fields:{ _id: 1}});
};

prevText = function(text , n){
    n = n || 20;

    return (text.length > n) ? text.substr(0,n-1)+'...' : text;
};


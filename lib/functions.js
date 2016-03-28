
// base64 convert function
Base64Avatar = function encodeImageFileAsURL(){

    var filesSelected = document.getElementById("avatarUpload").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            var newImage = document.createElement('img');
            newImage.src = srcData;

            document.getElementById("avatar").innerHTML = newImage.outerHTML;

        };

        fileReader.readAsDataURL(fileToLoad);
    }

}

// post insert auto height
Autoheight = function autoheight(a) {

    if (!$(a).prop('scrollTop')) {
        do {
            var b = $(a).prop('scrollHeight');
            var h = $(a).height();
            $(a).height(h - 5);
        }
        while (b && (b != $(a).prop('scrollHeight')));
    };
    $(a).height($(a).prop('scrollHeight') + 20);
}

//return the id of video on youtube url
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

// sring contain url check
//if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(status_text)) {
//    alert("url inside");
//}

function stringToDOM(some_html){
    var d = document.createElement('div');
    d.innerHTML = some_html;
    console.log(d);
    return d.firstChild;
}
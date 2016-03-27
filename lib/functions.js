
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

UI.registerHelper('postContentParse', function (text) {

    if (!text) {
        return;
    }

    var carriage_returns, linkify, newline, paragraphs;

    linkify = function (string) {

        var replacedText, http, www, mailto, youtube;

        http = /^(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        www = /^(^|[^\/])(www\.[\S]+(\b|$))/gim;
        mailto = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
        youtube = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;

        // if youtube
        if(string.match(youtube)) {
            var countYoutubeLinks = string.match(youtube).length;
            if (countYoutubeLinks > 1) {
                youtube = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i;
            } else {
                youtube = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
            }
        }

        string = string
            .replace(youtube, '<iframe width="100%" height="315px" src="https://www.youtube.com/embed/$1?modestbranding=1&iv_load_policy=3&version=3&color=white&theme=light" frameborder="0" allowfullscreen></iframe>')
            .replace(http, '<a href="$1" target="_blank">$1</a>')
            .replace(www, '$1<a href="http://$2" target="_blank">$2</a>')
            .replace(mailto, '<a href="mailto:$1">$1</a>')

        return string;
    };

    text = linkify(text);

    if(text.indexOf('<iframe width="100%" height="315px" src="https://www.youtube.com') > -1){

        var temp = text.split('\n');

        var res = "", index = "";

        for(var i = 0; i < temp.length ; i++){
            if(temp[i].indexOf('<iframe width="100%" height="315px" src="https://www.youtube.com') > -1){
                index = i;
            }else{
                res += temp[i] + '\n';
            }
        }

        res += '\n' + temp[index];
        text = res;
    }

    carriage_returns = /\r\n?/g;
    paragraphs = /\n\n+/g;
    newline = /([^\n]\n)(?=[^\n])/g;
    text = text.replace(carriage_returns, '\n');
    text = text.replace(paragraphs, '</p>\n<p>');
    text = text.replace(newline, '$1<br/>');

    text = '<p>' + text + '</p>';

    return new Spacebars.SafeString(text);
});
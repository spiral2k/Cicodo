UI.registerHelper('postContentParse', function (text) {

    if (!text) {
        return;
    }

    var carriage_returns, linkify, newline, paragraphs;

    linkify = function (string) {

        var replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4, replacePattern5;

        replacePattern1 = /^(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacePattern2 = /^(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
        replacePattern4 = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
        replacePattern5 = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;

        // if youtube
        if(string.match(replacePattern4)) {
            var countYoutubeLinks = string.match(replacePattern4).length;
            if (countYoutubeLinks > 1) {
                replacePattern4 = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i;
            } else {
                replacePattern4 = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
            }
        }

        string = string
            .replace(replacePattern4, '<iframe width="100%" height="315px" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>')
            .replace(replacePattern1, '<a href="$1" target="_blank">$1</a>')
            .replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>')
            .replace(replacePattern3, '<a href="mailto:$1">$1</a>')
            .replace(replacePattern5, '$1');

        return string;
    };

    text = linkify(text);

    if(text.indexOf('<iframe width="100%" height="315px" src="https://www.youtube.com') > -1){

        var temp = text.split('\n');

        var res = "", index = "";

        for(var i = 0; i < temp.length ; i++){
            if(temp[i].indexOf('<iframe width="100%" height="315px" src="https://www.youtube.com') > -1){
                index = i;
            }
        }

        for(var i = 0; i < temp.length ; i++) {
            if (index != i) {
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
    text = text.replace(paragraphs, '</p>\n\n<p>');
    text = text.replace(newline, '$1<br/>');

    text = '<p>' + text + '</p>';

    return new Spacebars.SafeString(text);
});
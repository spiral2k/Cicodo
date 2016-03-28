UI.registerHelper('postContentParse', function (text) {

    if (!text) {
        return;
    }

    var carriage_returns, linkify, newline, paragraphs;

    linkify = function (string) {
        var re;
        re = [
            "\\b(?:[hH][tT]{2}[pP][sS]{0,1}:\/\/)?[wW]{0,3}\.{0,1}[yY][oO][uU][tT][uU](?:\.[bB][eE]|[bB][eE]\.[cC][oO][mM])?\/(?:(?:[wW][aA][tT][cC][hH])?(?:\/)?\?(?:.*)?[vV]=([a-zA-Z0-9--]+).*|([A-Za-z0-9--]+))\\b",
            "\\b^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$\\b",
            "\\b(?:(?:https?|www):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])\\b",
            "\\b(?:(?:https?|www):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])\\b",
            "\\b(\\w[\\w.+-]*@[\\w.-]+\\.[a-z]{2,6})\\b",
            "@([a-z0-9]+)"
        ];
        re = new RegExp(re.join('|'), 'gi');
        return string.replace(re, function (match, youtube, youtu_be, url, www,  mail, username) {
            if(youtube){
                return '<iframe width="100%" height="315px" src="https://www.youtube.com/embed/'+ youtube +'" frameborder="0" allowfullscreen></iframe>';
            }
            if(youtu_be){
                return '<iframe width="100%" height="315px" src="https://www.youtube.com/embed/'+ youtu_be +'" frameborder="0" allowfullscreen></iframe>';
            }
            if (url) {
                return '<a href="http://' + url + '" target="_blank">' + url + '</a>';
            }
            if (www) {
                return '<a href="http://' + www + '" target="_blank">' + www + '</a>';
            }
            if (mail) {
                return '<a href="mailto:' + mail + '">' + mail + '</a>';
            }
            if (username) {
                if (Meteor.user().username === username) {
                    return '<span class="highlight-username">@' + username + '</span>';
                }
                return '@' + username;
            }


            return match;
        });
    };


    text = linkify(text);


    if(text.indexOf("youtube") > -1){
        var temp = text.split('\n');


        console.log("temp.length: " + temp.length +"temp array: " + temp);

        var res, index = "";

        for(var i = 0; i < temp.length ; i++){
            if(temp[i].indexOf('youtube') > -1){
                index = i;
            }
        }


        for(var i = 0; i < temp.length ; i++) {
            if (index != i) {

                console.log("temp["+ i+ "]: " + !temp[i]);

                res += temp[i] + '\n';
            }




        }

        console.log("res before: " + res)

        res += '\n' + temp[index];

        text = res;


        console.log("temp: " + res);

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
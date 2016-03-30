Meteor.methods({
    'insertPost' : function(content, createdAt){

        check(content, String);
        check(createdAt.date, Date);

        // get rid from html tags | replace <> with --
        content = content.replace(new RegExp(/(<([^>]+)>)/ig), "-$2-");

        var codeStartTagRegex = new RegExp(/-\s*code.*?-/gi);
        var codeStartTag = codeStartTagRegex.test(content);
        var codeEndTagRegex = new RegExp(/-\s*\/\s*code\s*.*?-/gi);
        var codeEndTag = codeEndTagRegex.test(content);

        if(codeStartTag && codeEndTag){
                content = content.replace(new RegExp(/-\s*code.*?-/gi),
                    "<div class='code'>");
                content = content.replace(new RegExp(/-\s*\/\s*code\s*.*?-/gi),
                    "\n</div>");
        }




        // get rid from html tags | replace <> with --
        content = content.replace(new RegExp(/(-([^-]+)-)/ig), "< $2>");


        Posts.insert({
            content:content,
            createdAt:createdAt,
            createdBy: Meteor.userId()
        });
    }
});
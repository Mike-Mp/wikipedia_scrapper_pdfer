const characterList = require("./characterList");

const makeTemplate = (title, content) => {

    let article = 
    `
        \\documentclass{article}

        \\usepackage[T1]{fontenc}
        \\usepackage[utf8]{inputenc}
        \\usepackage{textalpha}
        \\usepackage{textcomp}

        \\title{${title}}

        \\begin{document}

        \\maketitle

        \\abstract{${content[0]}}

    `

    for (i=1;i < content.length;i++) {
        if (content[i].startsWith("===")) {
                let modifiedContent = content[i].replace(/[=]*/g, "")
                article += `\n\\subsection{${modifiedContent}}`
            } else if (content[i].startsWith("==")) {
                let modifiedContent = content[i].replace(/[=]*/g, "")
                article += `\n\\section{${modifiedContent}}`
            }
            article += `\n${content[i]}`
    };


    article = article.replace(/=+ (\S* )+=+/g, "")

    article += `\n\\end{document}`

    for (key in characterList) {
        const value = characterList[key]; // a, b -> A, B
        article = article.replaceAll(key, value);  
    }

    console.log(article);

    return article;
}



module.exports = {
    makeTemplate
}
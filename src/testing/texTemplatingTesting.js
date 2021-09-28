const {splitter} = require("./regexTesting");

let content = splitter();

console.log("SPLITTED: ", content);

let templateString = `
        \\documentclass{article}

        \\usepackage[T1]{fontenc}
        \\usepackage[utf8]{inputenc}
        \\usepackage{textalpha}
        \\usepackage{textcomp}

        \\title{brap}

        \\begin{document}

        \\maketitle

        \\abstract{${content[0]}}
`

for(let i = 1; i < content.length;i++) {
    if (content[i].startsWith("===")) {
        let modifiedContent = content[i].replace(/[=]*/g, "")
        console.log("MODIFIED", modifiedContent)
        templateString += `\n\\subsection{${modifiedContent}}`
    } else if (content[i].startsWith("==")) {
        let modifiedContent = content[i].replace(/[=]*/g, "")
        console.log("MODIFIED", modifiedContent)
        templateString += `\n\\section{${modifiedContent}}`
    }
    templateString += `\n${content[i]}`
}

let noEqualSigns = templateString.replace(/=+ (\S* )+=+/g, "")

console.log(noEqualSigns);
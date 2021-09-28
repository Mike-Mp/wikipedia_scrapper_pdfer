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

        \\section{${content[1]}}

        ${content[2]}

        \\end{document}
    `

    // console.log(article);

    return article;
}

module.exports = {
    makeTemplate
}
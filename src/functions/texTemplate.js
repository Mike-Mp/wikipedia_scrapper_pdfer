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

        \\abstract{${content[0]}}

        \\section{${content[1]}}

        \\end{document}
    `

    return article;
}

module.exports = {
    makeTemplate
}
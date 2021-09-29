const wiki = require('wikijs').default;
const latex = require('node-latex');
const fs = require('fs');
const {makeTemplate} = require("./texTemplate");

const previewArticle = async (articleTitle) => {
    console.log("URL COMING TO SCRAPER: ", articleTitle)

    try {
        let data = await wiki().page(articleTitle).then(page =>
            page
                .chain()
                .summary()
                .links()
                .request()

            );

        const {title, extract} = data;

        console.log(extract)

        if (extract.toLowerCase().startsWith(`${title.toLowerCase()} may refer to`)) {
            const data = await getOtherResults(articleTitle);

            const {results, query} = data;

            return {results, query};
        }

        return {title, extract};

    } catch(err) {
        console.log("Preview Article: ", err);
    }

}

const getOtherResults = async(articleTitle) => {
    try {
        const data = await wiki().search(articleTitle);

        return data;
    } catch(err) {
        console.log("Get other results error: ", err);
    }
}

const createPdf = async (articleTitle, filePath) => {
    console.log("PDFY FUNCTION BEGIN: ", articleTitle);

    try {
        let data = await wiki().page(articleTitle).then(page =>
            page
                .chain()
                .content()
                .image()
                .request()
            );

        const  title = data.title;
        const content = data.extract.split(/(=+ (?:\S* )+=+)/g);

        await structurePdf(filePath, title, content);
    } catch(err) {
        console.log("createPdf: ", err);
    }

}

const structurePdf = async (filePath, title, content) => {
    const endDocument = makeTemplate(title, content);


    fs.writeFile(filePath + `/${title}_ERROR.log`, "", function(err) {
        if (err) {
            console.log("LOG CREATION ERROR: ", err)
        }

        console.log("log file created")
    })

    fs.writeFile(filePath + `/${title}.tex`, endDocument, function(err) {
        if (err) {
            console.log("texFile Err", err)
        }
        console.log("tex structured");
    });

    const input = fs.createReadStream(filePath + `/${title}.tex`)

    const output = fs.createWriteStream(filePath + `/${title}.pdf`);
    const pdf = latex(input, {cmd: "xelatex", errorLogs: filePath + `/${title}_ERROR.log`});

    pdf.pipe(output);
    pdf.on('error', err => console.error("lel: ", err));
    pdf.on('finish', () => console.log('PDF generated!'));
}

module.exports = {
    previewArticle,
    createPdf
}
const wiki = require('wikijs').default;
const latex = require('node-latex');
const fs = require('fs');
const path = require('path');
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
        if (err.message === "No article found") {
            const data = await getOtherResults(articleTitle)

            const {results, query} = data;
            return {results, query};
        }
        return err;
    }

}

const getOtherResults = async(articleTitle) => {
    try {
        const data = await wiki().search(articleTitle);

        console.log("DATA", data);

        return data;
    } catch(err) {
        console.log("Get other results error: ", err);
        return err;
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

        console.log('reachin before struct?')

        await structurePdf(filePath, title, content);
    } catch(err) {
        console.log("createPdf: ", err);
        const data = await getOtherResults(articleTitle);

        const {results, query} = data;
        return {results, query};
    }

}

const structurePdf = async (filePath, title, content) => {
    const endDocument = makeTemplate(title, content);

    title = title.replace(/\s/g, '');

    const newFolder = path.resolve(filePath, title)
    const errorLog = path.resolve(newFolder, `${title}_ERRORS.log`)
    const texFile = path.resolve(newFolder, `${title}_TEX.tex`)
    const pdfFile = path.resolve(newFolder, `${title}_PDF.pdf`)

    fs.mkdir(newFolder, {recursive: true}, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });


    fs.writeFile(errorLog, "", function(err) {
        if (err) {
            console.log("LOG CREATION ERROR: ", err)
        }

        console.log("log file created")
    })

    fs.writeFile(texFile, endDocument, function(err) {
        if (err) {
            console.log("texFile Err", err)
        }
        console.log("tex structured");
    });

    const input = fs.createReadStream(texFile)

    const output = fs.createWriteStream(pdfFile);
    const pdf = latex(input, {cmd: "xelatex", errorLogs: errorLog});

    pdf.pipe(output);
    pdf.on('error', err => console.error("lel: ", err));
    pdf.on('finish', () => console.log('PDF generated!'));
}

module.exports = {
    previewArticle,
    createPdf,
    getOtherResults
}
const wiki = require('wikijs').default;
const latex = require('node-latex');
const fs = require('fs');
const {makeTemplate} = require(".//texTemplate");

const previewArticle = async (articleTitle) => {
    console.log("URL COMING TO SCRAPER: ", articleTitle)

    try {
        let data = await wiki().page(articleTitle).then(page =>
            page
                .chain()
                .summary()
                .image()
                .links()
                .request()

            );

        const {title, extract, image} = data;

        return {title, extract, image};

    } catch(err) {
        console.log("Preview Article: ", err);
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
        const content = data.extract.split("\n\n");

        await structurePdf(filePath, title, content);
    } catch(err) {
        console.log("createPdf: ", err);
    }

}

const structurePdf = async (filePath, title, content) => {
    const endDocument = makeTemplate(title, content);

    fs.writeFile(filePath + '/errorLog.log', "", function(err) {
        if (err) {
            console.log("LOG: ", err)
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

    // fs.readFile(filePath + `${title}.tex`, 'utf8', function(err, data) {
    //     console.log("tex file contents: ", data);
    // });

    const output = fs.createWriteStream(filePath + `/${title}.pdf`);
    const pdf = latex(input, {cmd: "pdflatex", errorLogs: filePath + "/errorLog.log"});

    pdf.pipe(output);
    pdf.on('error', err => console.error("lel: ", err));
    pdf.on('finish', () => console.log('PDF generated!'));
}

module.exports = {
    previewArticle,
    createPdf
}
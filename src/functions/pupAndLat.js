const wiki = require('wikijs').default;
const latex = require('node-latex');
const fs = require('fs');

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

        
    } catch(err) {
        console.log("createPdf: ");
    }

}

module.exports = {
    previewArticle,
    createPdf
}
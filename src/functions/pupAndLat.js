const wiki = require('wikijs').default;
const latex = require('node-latex');
const fs = require('fs');

const previewArticle = async (urlText) => {
    console.log("URL COMING TO SCRAPER: ", urlText)

    try {
        let data = await wiki().page(urlText).then(page =>
            page
                .chain()
                .summary()
                .image()
                .links()
                .request()

            );

        console.log(data);

        const {title, extract, image} = data;

        return {title, extract, image};

    } catch(err) {
        console.log(err);
    }

}

const createPdf = async () => {

}

module.exports = {
    previewArticle,
    createPdf
}
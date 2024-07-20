import * as cheerio from 'cheerio';

export function getSourceImages(content){
    const $ = cheerio.load(content);
    // Lấy tất cả các thẻ img
    const imgElements = $('img');

    // Lặp qua các thẻ img và trích xuất URL
    const imageUrls = [];
    imgElements.each((i, imgElement) => {
        const imageUrl = $(imgElement).attr('src');
        imageUrls.push(imageUrl);
    });

    return imageUrls
}
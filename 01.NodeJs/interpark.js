const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const url = 'http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=bgnb_mn&bid2=LiveRanking&bid3=main&bid4=001';

async function defaultParser(url) {
    let response = await axios.get(url, {
        responseType: 'arraybuffer'
    });
    let contentType = response.headers['content-type'];
    let charset = contentType.includes('charset=') 
            ? contentType.split('charset=')[1]
            : 'UTF-8';
    let responseData = await response.data;
    let data = iconv.decode(responseData, charset);     
    
    const $ = await cheerio.load(data);
    $('.listItem, .singleType').each((idx, elem) => {
        let title = $(elem).find('.itemName').text().trim();
        let author = $(elem).find('.author').text().trim();
        let company = $(elem).find('.company').text().trim();
        let price = $(elem).find('.price').text()
                    .split(',').join('').replace(/[^0-9]/g,'').split('원')[0];
        console.log(`======================${idx+1}번======================`);
        console.log('책제목:',title);
        console.log('저자:',author);
        console.log('출판사:',company);
        console.log(`가격: ${price}원`);
    });
}
// defaultParser(url);

axios.get(url, {responseType: 'arraybuffer'})
    .then(res => {
        let contentType = res.headers['content-type'];
        let charset = contentType.includes('charset=') 
            ? contentType.split('charset=')[1]
            : 'UTF-8';
        let data = iconv.decode(res.data, charset);
        const $ = cheerio.load(data);
        $('.listItem').each((idx, elem) => {
            let title = $(elem).find('.itemName').text().trim();
            let author = $(elem).find('.author').text().trim();
            let company = $(elem).find('.company').text().trim();
            let price = $(elem).find('.price').text()
                        .split(',').join('').replace(/[^0-9]/g,'').split('원')[0];
            console.log(`======================${idx+1}번======================`);
            console.log('책제목:',title);
            console.log('저자:',author);
            console.log('출판사:',company);
            console.log(`가격: ${price}원`);
        });
    });
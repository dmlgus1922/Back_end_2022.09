const axios = require('axios');
const cheerio = require('cheerio');
const url = 'http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=bgnb_mn&bid2=LiveRanking&bid3=main&bid4=001';

axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        console.log(response.data);
        $('.listItem, .singleType').each((idx, elem) => {
            let title = $(elem).find('.itemName').text().trim();
            let author = $(elem).find('.author').text().trim();
            let company = $(elem).find('.company').text().trim();
            let price = $(elem).find('.price').text().trim().split(',').join('');
            console.log(idx+1, '번================================');
            console.log(title);
            console.log(author, company);
            console.log(price);
        });
    })
    .catch(err => {
        console.log(err);
    });
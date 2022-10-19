const puppeteer = require('puppeteer');
(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const articlesEachPage =[]
    for(let i = 1; i <= 20; i++){
        await page.goto(`https://store.hangdiathoidai.com/collections/available-now/?page=${i}`);
        // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
        const articles = await page.evaluate(() => {
            let product = document.querySelectorAll('.product-container');
            let data = [];
            product.forEach((item) => {
                let name = item.querySelector('.product-name a').innerText;
                let price = item.querySelector('.product-price .amout:first-child').innerText;
                let img = item.querySelector('.product-image .product-featured-image').src;
                data.push({name, price, img});
            }
            );
            return data;
        });
        articlesEachPage.push(articles);
        await page.waitForTimeout(1000);
    }

    // In ra kết quả và đóng trình duyệt
    console.log(articlesEachPage);
    await browser.close();
})();

// .product-featured-image
// .product-name > a.innerText
// .product-price .sale-price
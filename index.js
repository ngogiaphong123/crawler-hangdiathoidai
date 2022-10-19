const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const fs = require("fs")


app.get('/crawl', async (req, res) => {
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
    for(let i = 0; i < articlesEachPage.length; i++){
        articlesEachPage[i].forEach((item) => {
            item.page = i + 1;
        })
    }
    const result = [].concat(...articlesEachPage);
    await browser.close();
    res.send(result);
})
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
})
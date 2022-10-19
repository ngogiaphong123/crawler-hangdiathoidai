# crawler-hangdiathoidai
        const lastPage = 20;
        let data = [];
        for(let i = 0; i < lastPage; i++) {
            await page.waitFor(1000);
            let product = document.querySelectorAll('.product-container');
            product.forEach((item) => {
                let name = item.querySelector('.product-name a').innerText;
                let price = item.querySelector('.product-price .amout:first-child').innerText;
                let img = item.querySelector('.product-image .product-featured-image').src;
                data.push({name, price, img});
            });
            if(i !== lastPage - 1) {
                await page.click('.pagination .next>a');
            }
        }
        return data;
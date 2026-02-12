import { chromium } from 'playwright';

/**
 * 抓取竞品价格
 * @param {string} url 目标地址
 * @param {string} selector 价格标签的选择器
 */
async function scrapePrice(url, selector) {
    // 建议增加一些模拟浏览器的配置，防止被封
    const browser = await chromium.launch({
        headless: true,
        args: ['--disable-blink-features=AutomationControlled'] // 隐藏自动化特征
    });

    // 建议设置特定的 User-Agent
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();

    try {
        // 设置超时时间，防止无限等待
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        // 核心改进：显式等待选择器出现，增加代码稳定性
        await page.waitForSelector(selector, { timeout: 5000 });

        // 获取文本
        const priceString = await page.innerText(selector);

        // 数据清洗：改进后的正则，能处理更多复杂的货币格式
        const cleanedPrice = priceString.match(/[\d.]+/);
        const price = cleanedPrice ? parseFloat(cleanedPrice[0]) : null;

        if (price === null) throw new Error('无法解析价格数字');

        return { price, success: true, timestamp: new Date().toISOString() };
    } catch (error) {
        // 这里的 error.message 能提供更具体的报错原因（如超时、选择器不存在）
        return { price: null, success: false, error: error.message };
    } finally {
        await browser.close();
    }
}

// 测试代码
const testUrl = 'file:///C:/ly/beat/src/Scraper/test.html'; // 建议测试真实环境或使用 path 库处理本地路径
const selector = '.price-tag';

// 注意：在 ES Module 顶层可以直接用 await
const result = await scrapePrice(testUrl, selector);
console.table(result); // 用 table 显示结果更直观
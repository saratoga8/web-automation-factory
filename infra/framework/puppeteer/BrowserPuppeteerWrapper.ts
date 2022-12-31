import {BrowserWrapper} from "../BrowserWrapper";
import { ElementHandle, Page, Browser, launch } from "puppeteer"
import {assert} from "chai";

export class BrowserPuppeteerWrapper extends BrowserWrapper {
    private static _browser: Browser
    private static instance: BrowserPuppeteerWrapper

    private constructor() {
        super();
    }

    static async getInstance(): Promise<BrowserPuppeteerWrapper> {
        if (!BrowserPuppeteerWrapper.instance) {
            BrowserPuppeteerWrapper.instance = new BrowserPuppeteerWrapper()
            BrowserPuppeteerWrapper._browser = await launch(
                {
                    product: 'chrome',
                    headless: false,
                    args: ['--start-maximized'],
                    defaultViewport: null
                })
        }
        return BrowserPuppeteerWrapper.instance
    }

    async getToUrl(url: string): Promise<void> {
        await (await this.getCurrentPage()).goto(url)
    }

    async getElement(selector: string, timeout = 5000): Promise<ElementHandle> {
        const curPage = await (await BrowserPuppeteerWrapper._browser.pages())[0]
        process.stdout.write(`Waiting for element ${selector}...`)
        const element = await curPage.waitForSelector(selector, { timeout: timeout ?? 5000 })
        if (element) {
            console.log('OK')
            return element
        }
        assert.fail(`The element with the selector ${selector} not found`)
    }

    get browser(): Browser {
        return BrowserPuppeteerWrapper._browser;
    }

    async close(): Promise<void> {
        if (BrowserPuppeteerWrapper._browser) {
            await BrowserPuppeteerWrapper._browser.close()
        }
    }

    async waitForUrl(url: string, timeout = 3000): Promise<void> {
        await (await this.getCurrentPage()).waitForFunction(`document.URL === "${url}"`, { timeout })
    }

    async getCurrentPage(): Promise<Page> {
        return (await BrowserPuppeteerWrapper._browser.pages())[0]
    }

    async getUrl(): Promise<string> {
        return (await this.getCurrentPage()).url()
    }
}
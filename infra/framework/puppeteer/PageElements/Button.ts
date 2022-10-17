import { Button as GeneralButton } from '../../../src/PageElements/Button'
import {ElementPuppeteer} from "../ElementPuppeteer";
import {assert} from "chai";
import {BrowserPuppeteerWrapper} from "../BrowserPuppeteerWrapper";

export class Button extends ElementPuppeteer implements GeneralButton {
    async click(): Promise<void> {
        await (await this.instance).click()
    }

    async text(): Promise<string> {
        const page = await (await BrowserPuppeteerWrapper.getInstance()).getCurrentPage()
        const txt = await page.$eval(this.getSelectorStr(this.info.selector), (element) => element.textContent)
        if (txt) {
            return txt
        }
        assert.fail(`Can't get text from the element '${this.info.name}' with the selector '${this.info.selector.value}'`)
    }
}
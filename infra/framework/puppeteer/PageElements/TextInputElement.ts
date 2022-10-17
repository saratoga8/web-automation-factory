import {ElementWithText} from "../../../src/PageElements/ElementWithText";
import {assert} from "chai";
import {ElementPuppeteer} from "../ElementPuppeteer";
import {BrowserPuppeteerWrapper} from "../BrowserPuppeteerWrapper";

export class TextInputElement extends ElementPuppeteer implements ElementWithText {
    async text(): Promise<string> {
        const page = await (await BrowserPuppeteerWrapper.getInstance()).getCurrentPage()
        const txt = await page.$eval(this.getSelectorStr(this.info.selector), (element) => element.getAttribute('value'))
        if (txt) {
            return txt
        }
        assert.fail(`Can't get text from the element '${this.info.name}' with the selector '${this.info.selector.value}'`)
    }

    async type(txt: string): Promise<void> {
        await (await this.instance).type(txt)
    }
}
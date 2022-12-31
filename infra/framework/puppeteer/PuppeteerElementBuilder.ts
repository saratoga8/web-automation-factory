import {ElementBuilder} from "../Framework";
import {Elements} from "../../src/PageElements/Element";
import {BrowserPuppeteerWrapper} from "./BrowserPuppeteerWrapper";
import {Page} from "puppeteer";
import {assert} from "chai"
import {TextEditable} from "../../src/PageElements/TextEditable";
import {Clickable} from "../../src/PageElements/Clickable";
import {ContainsText} from "../../src/PageElements/ContainsText";



export class PuppeteerElementBuilder implements ElementBuilder {
    private async getPage(): Promise<Page> {
        const browserWrapper = await BrowserPuppeteerWrapper.getInstance()
        const page = await browserWrapper.getCurrentPage()
        return (page) ? page : assert.fail("Can't get a page instance")
    }

    async createClickable(info: Elements.ElementInfo): Promise<Clickable> {
        const page = await this.getPage()
        return new class implements Clickable {
            async click(): Promise<void> {
                const found = await page.$(info.selector.value)
                if (found) {
                    await found.click()
                } else {
                    assert.fail(`The element ${info.selector.value} not found`)
                }
            }
        }
    }

    async createContainingText(info: Elements.ElementInfo): Promise<ContainsText> {
        const getElementTxtByValueAttr = () => (element: Element) => element.getAttribute('value')
        const page = await this.getPage()

        return new class implements ContainsText {
            async text(): Promise<string> {
                return await page.$eval(info.selector.value, getElementTxtByValueAttr()) || ""
            }
        }
    }

    async createTextEditable(info: Elements.ElementInfo): Promise<TextEditable> {
        const page = await this.getPage()
        return new class implements TextEditable {
            async type(txt: string): Promise<void> {
                const found = await page.$(info.selector.value)
                if (found) {
                    await found.type(txt)
                }
                else {
                    assert.fail(`The element ${info.selector.value} not found`)
                }
            }
        }
    }
}
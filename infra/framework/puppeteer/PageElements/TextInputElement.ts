import { ElementPuppeteer } from '../ElementPuppeteer'
import { BrowserPuppeteerWrapper } from '../BrowserPuppeteerWrapper'
import { Elements } from '../../../src/PageElements/general/Element'
import { TextEditable } from '../../../src/PageElements/general/TextEditable'
import { ContainsText } from '../../../src/PageElements/general/ContainsText'
import { Clickable } from '../../../src/PageElements/general/Clickable'
import ElementInfo = Elements.ElementInfo

export class TextInputElement
    extends ElementPuppeteer
    implements Clickable, ContainsText, TextEditable
{
    constructor(info: ElementInfo) {
        super(info)
    }

    click() {
        return Promise.resolve(undefined)
    }

    async text(): Promise<string> {
        const browserWrapper = await BrowserPuppeteerWrapper.getInstance()
        const page = await browserWrapper.getCurrentPage()

        const getValue = (element: Element) => element.getAttribute('value')
        const selectorStr = this.getSelectorStr(this.info.selector)
        const txt = await page.$eval(selectorStr, getValue)
        return txt || ''
    }

    async type(txt: string) {
        await (await this.instance).type(txt)
    }
}

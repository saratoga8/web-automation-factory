import { ElementPuppeteer } from '../ElementPuppeteer'
import { assert } from 'chai'
import { BrowserPuppeteerWrapper } from '../BrowserPuppeteerWrapper'
import { Elements } from '../../../src/PageElements/Element'
import { Clickable } from '../../../src/PageElements/Clickable'
import { ContainsText } from '../../../src/PageElements/ContainsText'

export class Button
    extends ElementPuppeteer
    implements Clickable, ContainsText
{
    constructor(info: Elements.ElementInfo) {
        super(info)
    }

    async click(): Promise<void> {
        await (<Clickable>await this.instance).click()
    }

    async text(): Promise<string> {
        const page = await (
            await BrowserPuppeteerWrapper.getInstance()
        ).getCurrentPage()
        const txt = await page.$eval(
            this.getSelectorStr(this.info.selector),
            (element) => element.textContent
        )
        if (txt) {
            return txt
        }
        assert.fail(
            `Can't get text from the element '${this.info.name}' with the selector '${this.info.selector.value}'`
        )
    }
}

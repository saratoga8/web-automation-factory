import { ElementBuilder, Framework } from '../Framework'
import { BrowserWrapper } from '../BrowserWrapper'
import { Elements } from '../../src/PageElements/Element'
import { BrowserPuppeteerWrapper } from './BrowserPuppeteerWrapper'
import { ElementPuppeteer } from './ElementPuppeteer'
import { PuppeteerElementBuilder } from './PuppeteerElementBuilder'

export class Puppeteer implements Framework {
    get browser(): Promise<BrowserWrapper> {
        return (async () => {
            return await BrowserPuppeteerWrapper.getInstance()
        })()
    }

    async getElement(
        elementInfo: Elements.ElementInfo
    ): Promise<ElementPuppeteer> {
        return new ElementPuppeteer(elementInfo)
    }

    sleep(mSeconds: number): Promise<void> {
        return new Promise((r) => setTimeout(r, mSeconds))
    }

    get elementBuilder(): ElementBuilder {
        return new PuppeteerElementBuilder()
    }
}

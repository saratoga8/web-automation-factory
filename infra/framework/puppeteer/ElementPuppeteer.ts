import { ElementHandle } from 'puppeteer'
import { assert } from 'chai'
import { Element, Elements } from '../../src/PageElements/Element'
import { BrowserPuppeteerWrapper } from './BrowserPuppeteerWrapper'
import { Selector, SelectorType } from '../../src/Selector'

export class ElementPuppeteer extends Element {
    readonly info: Elements.ElementInfo
    protected readonly instance: Promise<ElementHandle> | ElementHandle

    constructor(info: Elements.ElementInfo, instance?: ElementHandle) {
        super(info)
        this.info = {
            name: info.name,
            timeoutMilliSeconds: info.timeoutMilliSeconds ?? 3000,
            selector: info.selector,
        }
        process.stdout.write(`Getting element ${info.name}...`)
        this.instance =
            instance ??
            (async () =>
                await await (
                    await BrowserPuppeteerWrapper.getInstance()
                ).getElement(
                    this.getSelectorStr(info.selector),
                    info.timeoutMilliSeconds
                ))()
    }

    async elementOfFramework(
        info: Elements.ElementInfo,
        ind?: number
    ): Promise<ElementHandle> {
        const found = await (
            await this.instance
        ).$(this.getSelectorStr(info.selector))
        if (found) {
            return found
        }
        assert.fail(
            `The element with the selector ${info.selector.value} not found inside the element with the selector ${this.info.selector.value}`
        )
    }

    async element(
        info: Elements.ElementInfo,
        ind?: number
    ): Promise<ElementPuppeteer> {
        console.log(
            `Getting the sub element ${info.name} of the element ${this.info.name}`
        )
        const found = ind
            ? (
                  await (
                      await this.instance
                  ).$$(this.getSelectorStr(info.selector))
              )[ind]
            : await (await this.instance).$(this.getSelectorStr(info.selector))
        if (found) {
            return new ElementPuppeteer(info, found)
        }
        assert.fail(
            `The element with the selector ${info.selector.value} not found inside the element with the selector ${this.info.selector.value}`
        )
    }

    protected getSelectorStr(selector: Selector): string {
        return selector.type === SelectorType.ID
            ? `#${selector.value}`
            : selector.value
    }
}

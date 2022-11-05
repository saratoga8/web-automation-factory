import {Framework} from "../Framework";
import {BrowserWrapper} from "../BrowserWrapper";
import {Element, Elements} from "../../src/PageElements/Element";
import {BrowserPuppeteerWrapper} from "./BrowserPuppeteerWrapper";
import {ElementPuppeteer} from "./ElementPuppeteer";
import {ElementHandle} from "puppeteer";
import {TextInputElement} from "./PageElements/TextInputElement";
import {Button} from "./PageElements/Button";
import PossibleElementType = Elements.PossibleElementType;
import { assert } from 'chai'


export class Puppeteer implements Framework {
    get browser(): Promise<BrowserWrapper> {
        return (async () => { return await BrowserPuppeteerWrapper.getInstance() })()
    }

    async getElement(elementInfo: Elements.ElementInfo): Promise<Element<ElementHandle> | PossibleElementType> {
        if (elementInfo.type) {
            switch (Number(elementInfo.type)) {
                case Elements.Types.BUTTON: return new Button(elementInfo)
                case Elements.Types.TEXT_INPUT: return new TextInputElement(elementInfo)
                default: {
                    assert.fail(`Unknown element type ${Number(elementInfo.type)}`)
                }
            }
        }
        return new ElementPuppeteer(elementInfo)
    }

    sleep(mSeconds: number): Promise<void> {
        return new Promise(r => setTimeout(r, mSeconds))
    }
}

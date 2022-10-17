import {SelectorType} from "../framework/Selector";
import {RootedPage} from "./RootedPage";
import {Framework} from "../framework/Framework";
import {Elements} from "../framework/Element";
import ElementInfo = Elements.ElementInfo;
import { waitFor, WaitInfo } from "../src/Utils"




export enum Playgrounds {
    TableQA = 10
}

export class OverviewPage extends RootedPage {
    static readonly SIGNIN_TIMEOUT = 60 * 1000
    private readonly rootElement: ElementInfo

    constructor(framework: Framework) {
        super(
            framework,
            'Studio | AI21',
            'https://studio.ai21.com/overview',
            'Overview',
            { type: SelectorType.CSS, value: '#root' }
        )
        this.rootElement = { name: 'Root element', selector: this.rootElementSelector, timeoutMilliSeconds: OverviewPage.SIGNIN_TIMEOUT }
    }

    async isOpen(): Promise<boolean> {
        // const elementInfo = {
        //     name: 'Panel',
        //     selector: {
        //         type: SelectorType.CSS,
        //         value: 'div.MuiGrid-root.MuiGrid-container'
        //     }
        // }
        // this.framework.browser
        // return (await (await this.framework.getElement(this.rootElement)).element(elementInfo)).is(State.visible)

        // for (let i = 0; i < OverviewPage.SIGNIN_TIMEOUT; ++i) {
        //     const actualURL = await (await this.framework.browser).getUrl()
        //     if (actualURL === this.url) {
        //         return true
        //     }
        //     await (await this.framework).sleep(1000)
        // }
        // return false
        const sleep = async () => await (await this.framework).sleep(info.stepMs)
        const predicate = async () => {
            const actualURL = await (await this.framework.browser).getUrl()
            return actualURL === this.url
        }
        const info: WaitInfo = {
            stepMs: 1000,
            timeoutMs: OverviewPage.SIGNIN_TIMEOUT,
            sleep,
            predicate
        }
        return await waitFor(info)
    }

    private getPlaygroundElementInfo(): ElementInfo {
        const selector = { type: SelectorType.CSS, value: 'div.MuiGrid-container.MuiGrid-item.MuiGrid-direction-xs-column.MuiGrid-justify-content-xs-space-between' }
        return { name: Playgrounds.TableQA.toString(), selector }
    }

    async openPlayground(playground: Playgrounds) {
        const playgroundsContainerElementInfo = {
            name: 'playgrounds',
            selector: {
                type: SelectorType.CSS,
                value: 'div.MuiGrid-root.MuiGrid-container.MuiGrid-item.MuiGrid-grid-xs-6.MuiGrid-grid-md-4 svg'
            }
        }

        await (await (await this.framework.getElement(this.rootElement)).element(playgroundsContainerElementInfo, playground.valueOf())).click()
    }
}





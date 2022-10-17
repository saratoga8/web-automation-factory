import {PlaygroundPage} from "./PlaygroundPage";
import {Framework} from "../framework/Framework";
import {SelectorType} from "../framework/Selector";
import {Elements} from "../framework/Element";
import ElementInfo = Elements.ElementInfo;
import {Playgrounds} from "./OverviewPage";


export class TableQaPage extends PlaygroundPage {
    private readonly rootElement: ElementInfo

    constructor(framework: Framework) {
        super(framework, 'Table Q&A');
        this.rootElement = { name: `The Root element of the page ${this.name}`, selector: this.rootElementSelector }
    }

    async isOpen(): Promise<boolean> {
        const elementInfo = {
            name: 'preset',
            selector: {
                type: SelectorType.CSS,
                value: 'div[data-testid="preset_selector"] input'
            }
        }
        const txt = await (await (await this.framework.getElement(this.rootElement)).element(elementInfo)).text()
        return txt === this.name
    }

    async choosePreset(playground: Playgrounds): Promise<this> {
        return this
    }
}
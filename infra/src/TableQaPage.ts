import { PlaygroundPage } from './PlaygroundPage'
import { Framework } from '../framework/Framework'
import { SelectorType } from './Selector'
import { Elements } from './PageElements/Element'
import { Playgrounds } from './OverviewPage'
import ElementInfo = Elements.ElementInfo

export class TableQaPage extends PlaygroundPage {
    private readonly rootElementInfo: ElementInfo

    constructor(framework: Framework) {
        super(framework, 'Table Q&A')
        this.rootElementInfo = {
            name: `The Root element of the page ${this.name}`,
            selector: this.rootElementSelector,
        }
    }

    async isOpen(): Promise<boolean> {
        const elementInfo = {
            name: 'preset',
            selector: {
                type: SelectorType.CSS,
                value: 'div[data-testid="preset_selector"] input',
            },
        }
        // const rootElement = await this.framework.getElement(this.rootElementInfo))
        // const element = rootElement.element(elementInfo)
        // const txt = new TextElement(element).text()
        // return txt === this.name

        return true
    }

    async choosePreset(playground: Playgrounds): Promise<this> {
        return this
    }
}

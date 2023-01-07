import { ElementBuilder, Framework } from '../../../framework/Framework'
import { Element, Elements } from './Element'
import ElementInfo = Elements.ElementInfo
import { Clickable } from './Clickable'
import { ContainsText } from './ContainsText'
import { TextEditable } from './TextEditable'

export type ContainingEditableText = Clickable & ContainsText & TextEditable

export class TextInputElement
    extends Element
    implements ContainingEditableText
{
    private elementBuilder: ElementBuilder

    constructor(framework: Framework, info: ElementInfo) {
        super(info)
        this.elementBuilder = framework.elementBuilder
    }

    async type(txt: string) {
        await (
            await this.elementBuilder.createTextEditable(this.info)
        ).type(txt)
    }

    async text(): Promise<string> {
        return await (
            await this.elementBuilder.createContainingText(this.info)
        ).text()
    }

    async click() {
        await (await this.elementBuilder.createClickable(this.info)).click()
    }
}

import {ElementWithText} from "./ElementWithText";
import {ElementOfFramework} from "./ElementOfFramework";
import {Framework} from "../../framework/Framework";
import {Elements} from "./Element";
import ElementInfo = Elements.ElementInfo;



export class TextInputElement extends ElementOfFramework implements ElementWithText {
    private readonly txtElement: TextInputElement

    private constructor(framework: Framework, element: TextInputElement) {
        super(framework, element.info)
        this.txtElement = element
        this.info.type = Elements.Types.TEXT_INPUT
    }

    static async createByElementInfo(framework: Framework, info: ElementInfo): Promise<TextInputElement> {
        const element = await framework.getElement(info) as TextInputElement
        return new TextInputElement(framework, element)
    }

    static createByOtherElement(framework: Framework, other: Clickable | ElementWithText): TextInputElement {
        return new TextInputElement(framework, <TextInputElement>other)
    }


    async type(txt: string): Promise<void> {
        this.txtElement.type()
    }

    async text(): Promise<string> {
        return await (<ElementWithText>await (await this.framework.getElement(this.info))).text()
    }
}
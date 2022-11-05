import {Element, Elements, FrameworkElementType} from "./Element";
import {ElementWithText} from "./ElementWithText";
import {ElementOfFramework} from "./ElementOfFramework";
import ElementInfo = Elements.ElementInfo;
import {Framework} from "../../framework/Framework";
import {Cli} from "@cucumber/cucumber";


export class Button extends ElementOfFramework implements Clickable, Element<FrameworkElementType>, ElementWithText {
    private readonly btnElement: Clickable | ElementWithText

    private constructor(framework: Framework, element: Clickable | ElementWithText) {
        super(framework, element.info);
        this.btnElement = element
    }

    static async createByElementInfo(framework: Framework, info: ElementInfo): Promise<Button> {
        info.type = Elements.Types.BUTTON
        const element = await framework.getElement(info) as Clickable | ElementWithText
        return new Button(framework, element)
    }

    static createByOtherElement(framework: Framework, other: Element<FrameworkElementType>): Button {
        return new Button(framework, other)
    }

    async click(): Promise<void> {
        await this.btnElement.click()
    }

    text(): Promise<string> {
        return Promise.resolve("");
    }
}
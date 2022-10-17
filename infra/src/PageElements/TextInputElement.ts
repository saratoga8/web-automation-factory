import {ElementWithText} from "./ElementWithText";
import {ElementOfFramework} from "./ElementOfFramework";
import {Framework} from "../../framework/Framework";
import {Elements} from "../../framework/Element";
import ElementInfo = Elements.ElementInfo;



export class TextInputElement extends ElementOfFramework implements ElementWithText {
    constructor(framework: Framework, info: ElementInfo) {
        super(framework, info);
        info.type = Elements.Types.TEXT_INPUT
    }

    type(txt: string): void {
        await (<ElementWithText>await (await this.framework.getElement(this.info)))
    }

    async text(): Promise<string> {
        return await (<ElementWithText>await (await this.framework.getElement(this.info))).text()
    }
}
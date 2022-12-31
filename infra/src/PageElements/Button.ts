import {Element, Elements} from "./Element";
import {ElementBuilder, Framework} from "../../framework/Framework";
import ElementInfo = Elements.ElementInfo;
import {ContainsText} from "./ContainsText";
import {Clickable} from "./Clickable";

export class Button extends Element implements Clickable, ContainsText {
    private elementBuilder: ElementBuilder

    constructor(framework: Framework, info: ElementInfo) {
        super(info);
        this.elementBuilder = framework.elementBuilder
    }

    async text(): Promise<string> {
        return await
            (await this
                    .elementBuilder
                    .createContainingText(this.info)
            ).text()
    }

    async click() {
        await
            (await this
                    .elementBuilder
                    .createClickable(this.info)
            ).click()
    }
}
import {Element, Elements, FrameworkElementType} from "./Element";
import {Framework} from "../../framework/Framework";
import PossibleElementType = Elements.PossibleElementType;

export class ElementOfFramework implements Element<FrameworkElementType> {
    constructor(
        readonly framework: Framework,
        readonly info: Elements.ElementInfo
    ) {}

    private async getRootElement(): Promise<Element<FrameworkElementType>> {
        return await (await this.framework).getElement(this.info) as Element<FrameworkElementType>
    }

    async element(info: Elements.ElementInfo, ind?: number): Promise<Element<FrameworkElementType> | PossibleElementType> {
        const rootElement = await this.getRootElement()
        return rootElement.element(info, ind)
    }

    async elementOfFramework(info: Elements.ElementInfo, ind?: number): Promise<FrameworkElementType> {
        return (await this.getRootElement()).elementOfFramework(info, ind)
    }

    async is(state: Elements.States): Promise<boolean> {
        return (await this.getRootElement()).is(state)
    }
}
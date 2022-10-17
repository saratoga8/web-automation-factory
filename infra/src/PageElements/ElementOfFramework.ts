import {Element, Elements, FrameworkElementType} from "../../framework/Element";
import {Framework} from "../../framework/Framework";

export abstract class ElementOfFramework implements Element<FrameworkElementType> {
    readonly info: Elements.ElementInfo;

    protected constructor(protected readonly framework: Framework, info: Elements.ElementInfo) {
        this.info = info
    }

    async element(info: Elements.ElementInfo, ind?: number): Promise<Element<FrameworkElementType>> {
        return (await (await this.framework).getElement(this.info)).element(info, ind)
    }

    async elementOfFramework(info: Elements.ElementInfo, ind?: number): Promise<FrameworkElementType> {
        return (await (await this.framework).getElement(this.info)).elementOfFramework(info, ind)
    }

    async is(state: Elements.States): Promise<boolean> {
        return (await (await this.framework).getElement(this.info)).is(state)
    }
}
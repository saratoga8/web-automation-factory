import {Element, FrameworkElementType} from "../../framework/Element";

export interface ElementWithText extends Element<FrameworkElementType> {
    text(): Promise<string>
}
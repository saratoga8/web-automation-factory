import {Element, FrameworkElementType} from "./Element";

export interface ElementWithText extends Element<FrameworkElementType> {
    text(): Promise<string>
}
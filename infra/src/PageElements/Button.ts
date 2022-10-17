import {Element, FrameworkElementType} from "../../framework/Element";
import {ElementWithText} from "./ElementWithText";

export interface Button extends Clickable, Element<FrameworkElementType>, ElementWithText {
    click(): Promise<void>
}
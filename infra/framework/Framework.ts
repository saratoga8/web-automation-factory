import { BrowserWrapper } from "./BrowserWrapper";
import {Element, Elements, FrameworkElementType} from "./Element";
import ElementInfo = Elements.ElementInfo;
import PossibleElementType = Elements.PossibleElementType;


export interface Framework {
    get browser(): Promise<BrowserWrapper>
    sleep(mSeconds: number): Promise<void>

    getElement(element: ElementInfo): Promise<Element<FrameworkElementType> | PossibleElementType>
}


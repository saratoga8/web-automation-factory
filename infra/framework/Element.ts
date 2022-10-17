import {Selector} from "./Selector";
import ElementInfo = Elements.ElementInfo;
import {ElementHandle} from "puppeteer";
import {ElementWithText} from "../src/PageElements/ElementWithText";
import PossibleElementType = Elements.PossibleElementType;

export namespace Elements {
    export enum States {
        visible, existing
    }

    export type ElementInfo = {
        selector: Selector,
        name: string
        timeoutMilliSeconds?: number
        type?: Types
    }

    export enum Types {
        BUTTON, TEXT_INPUT
    }

    export type PossibleElementType = Clickable | ElementWithText
}

export type FrameworkElementType = string | ElementHandle | number

export interface Element<T extends FrameworkElementType> {
    readonly info: ElementInfo

    is(state: Elements.States): Promise<boolean>
    element(info: ElementInfo, ind?: number): Promise<Element<T> | PossibleElementType>
    elementOfFramework(info: ElementInfo, ind?: number): Promise<FrameworkElementType>
}


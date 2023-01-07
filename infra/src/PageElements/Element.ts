import { Selector } from '../Selector'
import ElementInfo = Elements.ElementInfo

export namespace Elements {
    export type ElementInfo = {
        selector: Selector
        name: string
        timeoutMilliSeconds?: number
    }
}

export abstract class Element {
    protected constructor(public readonly info: ElementInfo) {}
}

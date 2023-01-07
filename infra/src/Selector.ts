export enum SelectorType {
    ID,
    CLASS,
    CSS,
}
export type Selector = {
    type: SelectorType
    value: string
}

import { BrowserWrapper } from './BrowserWrapper'
import { Elements } from '../src/PageElements/Element'
import { TextEditable } from '../src/PageElements/TextEditable'
import { ContainsText } from '../src/PageElements/ContainsText'
import { Clickable } from '../src/PageElements/Clickable'

export interface ElementBuilder {
    createTextEditable(info: Elements.ElementInfo): Promise<TextEditable>
    createContainingText(info: Elements.ElementInfo): Promise<ContainsText>
    createClickable(info: Elements.ElementInfo): Promise<Clickable>
}

export interface Framework {
    get browser(): Promise<BrowserWrapper>
    sleep(mSeconds: number): Promise<void>

    get elementBuilder(): ElementBuilder
}

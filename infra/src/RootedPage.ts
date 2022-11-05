import {Selector} from "./Selector";
import {Framework} from "../framework/Framework";
import {PageObject} from "./PageObject";


export abstract class RootedPage extends PageObject {
    protected readonly rootElementSelector: Selector

    protected constructor(framework: Framework, title: string, url: string, name: string, selector: Selector) {
        super(framework, title, url, name)
        this.rootElementSelector = selector
    }
}
import {Framework} from "../framework/Framework";

export abstract class PageObject {
    protected constructor(
        protected readonly framework: Framework,
        protected readonly title: string,
        protected readonly url: string,
        protected readonly name: string
    ) {
        this.title = title
        this.name = name
        this.url = url
        this.framework = framework
    }

    async open(): Promise<PageObject> {
        await (await this.framework.browser).getToUrl(this.url)
        return this
    }

    abstract isOpen(): Promise<boolean>
}
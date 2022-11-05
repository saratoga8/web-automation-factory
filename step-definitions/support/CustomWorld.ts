import {IWorldOptions, World} from "@cucumber/cucumber";
import {BrowserWrapper} from "../../infra/framework/BrowserWrapper";
import { Puppeteer as Framework } from "../../infra/framework/puppeteer/Puppeteer"

const framework = new Framework()

export default class CustomWorld extends World {
    browser: BrowserWrapper | null = null

    constructor(options: IWorldOptions<any>) {
        super(options);
    }

    async init(): Promise<BrowserWrapper> {
        if (this.browser === null) {
            this.browser = await framework.browser
        }
        return this.browser
    }

    [key: string]: any;
}

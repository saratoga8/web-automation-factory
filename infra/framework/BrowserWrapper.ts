export abstract class BrowserWrapper {
    abstract getToUrl(url: string): Promise<void>   // TODO: Should be refactored to using set/get
    abstract close(): Promise<void>
    abstract waitForUrl(url: string): Promise<void>
    abstract getUrl(): Promise<string>
}

export type WaitInfo = {
    timeoutMs: number,
    stepMs: number,
    predicate(args?: any): Promise<boolean>
    sleep(timeMs: number): Promise<void>,
}

export const waitFor = async (info: WaitInfo): Promise<boolean> => {
    const countNum = info.timeoutMs / info.stepMs
    for (let i = 0; i < countNum; ++i) {
        const result = await info.predicate()
        if (result) {
            return true
        }
        await info.sleep(info.stepMs)
        // const actualURL = await (await this.framework.browser).getUrl()
        // if (actualURL === this.url) {
        //     return true
        // }
        // await (await this.framework).sleep(stepMs)
    }
    return false
}
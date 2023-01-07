import { After, Before, setWorldConstructor } from '@cucumber/cucumber'
import CustomWorld from './CustomWorld'

setWorldConstructor(CustomWorld)

Before(async function () {
    await this.init()
})

After(async function () {
    await this.browser.close()
})

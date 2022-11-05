import { expect } from 'chai'
import { OverviewPage, Playgrounds } from "../infra/src/OverviewPage"
import { Puppeteer as Framework } from "../infra/framework/puppeteer/Puppeteer"
import { Given, When } from "@cucumber/cucumber";
import LoginPage from "../infra/src/loginPage";

const framework = new Framework()

Given(/^user is on the Overview page$/, { timeout: OverviewPage.SIGNIN_TIMEOUT + 10 }, async function () {
    const creds = { email: 'saratoga8@gmail.com', pwd: 'bigtits8' }
    const loginPage: LoginPage = await new LoginPage(framework).open() as LoginPage
    await loginPage.login(creds)
    const expected = await (new OverviewPage(framework)).isOpen()
    expect(expected, 'The Overview page is not opened').true
})

When(/^user opens Table Q&A in the Overview page$/, async function () {
    await new OverviewPage(framework).openPlayground(Playgrounds.TableQA)
})
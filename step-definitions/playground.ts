import { expect } from 'chai'
import {TableQaPage} from "../infra/src/TableQaPage";
import { Puppeteer as Framework } from "../infra/framework/puppeteer/Puppeteer"
import {Then, When} from "@cucumber/cucumber";
import {OverviewPage, Playgrounds} from "../infra/src/OverviewPage";

const framework = new Framework()

Then(/^user is on the playground of Table Q&A$/, {timeout: 10000}, async function () {
    const expected = await new TableQaPage(framework).isOpen()
    expect(expected, 'The example of Table Q&A is not open').true
})

When(/^user opens Table Q&A page$/, async function () {
    const page = <TableQaPage> await new TableQaPage(framework).open()
    await page.choosePreset(Playgrounds.TableQA)
})
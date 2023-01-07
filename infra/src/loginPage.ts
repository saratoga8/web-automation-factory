import { PageObject } from './PageObject'
import { Framework } from '../framework/Framework'
import { Elements } from './PageElements/Element'
import { SelectorType } from './Selector'
import { Button } from './PageElements/Button'
import { TextInputElement } from './PageElements/TextInputElement'
import ElementInfo = Elements.ElementInfo

type LoginCreds = { email: string; pwd: string }

export default class LoginPage extends PageObject {
    private readonly emailFieldInfo: ElementInfo
    private readonly pwdFieldInfo: ElementInfo
    private readonly submitBtn: ElementInfo

    constructor(framework: Framework) {
        super(
            framework,
            'Studio | AI21',
            'https://studio.ai21.com/login',
            'Login'
        )
        this.emailFieldInfo = {
            name: 'Email',
            selector: { type: SelectorType.CSS, value: '#email' },
        }
        this.pwdFieldInfo = {
            name: 'Password',
            selector: { type: SelectorType.CSS, value: '#password' },
        }
        this.submitBtn = {
            name: 'Submit',
            selector: {
                type: SelectorType.CSS,
                value: 'button[data-testid="login_button"]',
            },
        }
    }

    isOpen(): Promise<boolean> {
        return Promise.resolve(false)
    }

    async login(creds: LoginCreds) {
        const emailInput = await new TextInputElement(
            this.framework,
            this.emailFieldInfo
        )
        await emailInput.type(creds.email)
        const pwdInput = await new TextInputElement(
            this.framework,
            this.pwdFieldInfo
        )
        await pwdInput.type(creds.pwd)

        const submitBtn = await new Button(this.framework, this.submitBtn)
        await submitBtn.click()
    }
}

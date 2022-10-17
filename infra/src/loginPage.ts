import {PageObject} from "./PageObject";
import {Framework} from "../framework/Framework";
import {Elements} from "../framework/Element";
import {SelectorType} from "../framework/Selector";
import ElementInfo = Elements.ElementInfo;
import {Button} from "./PageElements/Button";
import {TextInputElement} from "./PageElements/TextInputElement";



type LoginCreds = { email: string, pwd: string }

export class LoginPage extends PageObject {
    private readonly emailFieldInfo: ElementInfo
    private readonly pwdFieldInfo: ElementInfo
    private readonly submitBtn: ElementInfo

    constructor(framework: Framework) {
        super(
            framework,
            'Studio | AI21',
            'https://studio.ai21.com/login',
            'Login',
        );
        this.emailFieldInfo = {
            name: 'Email',
            selector: { type: SelectorType.CSS, value: '#email' }
        }
        this.pwdFieldInfo = {
            name: 'Password',
            selector: { type: SelectorType.CSS, value: '#password' }
        }
        this.submitBtn = {
            name: 'Submit',
            selector: { type: SelectorType.CSS, value: 'button[data-testid="login_button"]'}
        }
    }

    isOpen(): Promise<boolean> {
        return Promise.resolve(false);
    }

    async login(creds: LoginCreds) {
        await new TextInputElement(this.framework, this.emailFieldInfo).type(creds.email)
        await new TextInputElement(this.framework, this.pwdFieldInfo).type(creds.pwd)

        await new Button()
        const submitBtn = await this.framework.getElement<Button>(this.submitBtn)
        await submitBtn.click()
    }
}
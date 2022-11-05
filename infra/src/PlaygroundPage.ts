import {RootedPage} from "./RootedPage";
import {Framework} from "../framework/Framework";
import { SelectorType } from "./Selector";

export abstract class PlaygroundPage extends RootedPage {
    protected constructor(framework: Framework, name: string) {
        super(
            framework,
            'Studio | AI21',
            'https://studio.ai21.com/playground',
            name,
            { type: SelectorType.ID, value: 'root' }
        )
    }
}
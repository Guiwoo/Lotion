import { BasicComponent, Component } from "../component.js";
import { Composable } from "../Page/page.js";

type OncloseListener = () => void;
type OnsubmitListener = () => void;

export interface MediaData {
    readonly title:string;
    readonly url:string;
}

export interface TextData {
    readonly title:string;
    readonly body:string;
}

export class InputDialog extends BasicComponent<HTMLElement> implements Composable {
    closeListener? :OncloseListener;
submitListener? : OnsubmitListener;
    constructor(){
        super(`<section class="dialog">
                <div class="dialog__container">
                    <button class="close">&times;</button>
                    <div id="dialog__body"></div>
                    <button class="dialog__submit">ADD</button>
                </div>
                </section>`)
                const closeBtn = this.element.querySelector('.close')!as HTMLButtonElement
                closeBtn.onclick = () => {
                    this.closeListener && this.closeListener();
                }
                const submitBtn = this.element.querySelector(`.dialog__submit`)!as HTMLButtonElement
                submitBtn.onclick = () => {
                    this.submitListener && this.submitListener();
                }
    }
    setOncloseListener(listener:OncloseListener){
        this.closeListener = listener
    }

    setOnsubmitListener(listener:OnsubmitListener){
        this.submitListener = listener
    }
    addChild(child:Component) {
        const body = this.element.querySelector('#dialog__body')!as HTMLElement;
        child.attachTo(body)
    }
}
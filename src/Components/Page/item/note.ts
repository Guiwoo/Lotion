import { BasicComponent } from "../../component.js";

export class NoteComponent extends BasicComponent<HTMLElement> {
    constructor(title:string,body:string) {
        super(`<section>
                <h2 class="note__title page-item__title"></h2>
                <p class="note__body"></p>
            </section>`)
        const titleEl = this.element.querySelector('.note__title')! as HTMLHeadElement
        titleEl.textContent = title;

        const bodyEl = this.element.querySelector('.note__body')! as HTMLParagraphElement
        bodyEl.textContent = body;
    }
}
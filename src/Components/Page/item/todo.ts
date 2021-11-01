import { BasicComponent } from "../../component.js";

export class TodoComponent extends BasicComponent<HTMLElement> {
    constructor(title:string,todo:string) {
        super(`<section>
                <h2 class="todo__title page-item__title"></h2>
                <input type="checkbox" class="todo__checkbox">
            </section>`)
        const titleEl = this.element.querySelector('.todo__title')! as HTMLHeadingElement
        titleEl.textContent = title;

        const todoEl = this.element.querySelector('.todo__checkbox')! as HTMLInputElement;
        todoEl.insertAdjacentText('afterend',todo)
    }
}
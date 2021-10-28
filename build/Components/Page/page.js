import { BasicComponent } from "../component.js";
export class PageItemComponent extends BasicComponent {
    constructor() {
        super(`<li class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
                </li>`);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeHandler && this.closeHandler();
        };
    }
    addChild(child) {
        const container = this.element.querySelector(`.page-item__body`);
        child.attachTo(container);
    }
    setOnCloseHandler(handler) {
        this.closeHandler = handler;
    }
}
export class PageComponent extends BasicComponent {
    constructor(pageItemConstructor) {
        super(`<ul class="page"></ul>`);
        this.pageItemConstructor = pageItemConstructor;
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseHandler(() => {
            item.removeFrom(this.element);
        });
    }
}

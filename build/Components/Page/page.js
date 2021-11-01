import { BasicComponent } from "../component.js";
export class PageItemComponent extends BasicComponent {
    constructor() {
        super(`<li class="page-item" draggable="true">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
                </li>`);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeHandler && this.closeHandler();
        };
        this.element.addEventListener('dragstart', (event) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event) => {
            this.onDragEnd(event);
        });
        this.element.addEventListener('dragenter', (event) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener('dragleave', (event) => {
            this.onDragLeave(event);
        });
    }
    addChild(child) {
        const container = this.element.querySelector(`.page-item__body`);
        child.attachTo(container);
    }
    setOnCloseHandler(handler) {
        this.closeHandler = handler;
    }
    onDragStart(_) {
        this.notifyDragObservers('start');
        this.element.classList.add('lifted');
    }
    onDragLeave(_) {
        this.notifyDragObservers('leave');
        this.element.classList.remove('drop-area');
    }
    onDragEnter(_) {
        this.notifyDragObservers('enter');
        this.element.classList.add('drop-area');
    }
    onDragEnd(_) {
        this.notifyDragObservers('stop');
        this.element.classList.remove('lifted');
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
    onDropped() {
        this.element.classList.remove('drop-area');
    }
}
export class PageComponent extends BasicComponent {
    constructor(pageItemConstructor) {
        super(`<ul class="page"></ul>`);
        this.pageItemConstructor = pageItemConstructor;
        this.children = new Set();
        this.element.addEventListener('dragover', (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event) => {
            this.onDrop(event);
        });
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDrop(event) {
        event.preventDefault();
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
        }
        this.dropTarget.onDropped();
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseHandler(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target, state) => {
            switch (state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    break;
                case `stop`:
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    break;
                case `enter`:
                    this.dropTarget = target;
                    break;
                case `leave`:
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`Unsupported State: ${state}`);
            }
        });
    }
    updateSections(state) {
        this.children.forEach((section) => {
            section.muteChildren(state);
        });
    }
    ;
}

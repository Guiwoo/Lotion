import { BasicComponent, Component } from "../component.js";

export interface Composable {
    addChild(child:Component):void
}

type OnCloseHandler = () =>void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable{
    setOnCloseHandler(handler: OnCloseHandler):void;
    setOnDragStateListener(listener: OnDragStateListener<SectionContainer>):void;
    muteChildren(state:'mute'|'unmute'):void;
    getBoundingRect(): DOMRect;
    onDropped():void;
}

type SectionContainerConstructor = {
    new (): SectionContainer; // 생성자 정의 컨테이너
}

export class PageItemComponent extends BasicComponent<HTMLElement> implements SectionContainer{
    private closeHandler?: OnCloseHandler;
    private dragStateListener?: OnDragStateListener<PageItemComponent>

    constructor() {
        super(`<li class="page-item" draggable="true">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
                </li>`)
            const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement
            closeBtn.onclick= () => {
                this.closeHandler && this.closeHandler();
            }
            this.element.addEventListener('dragstart',(event:DragEvent)=>{
                this.onDragStart(event);
            })
            this.element.addEventListener('dragend',(event:DragEvent)=>{
                this.onDragEnd(event);
            })
            this.element.addEventListener('dragenter', (event: DragEvent) => {
                this.onDragEnter(event);
              });
              this.element.addEventListener('dragleave', (event: DragEvent) => {
                this.onDragLeave(event);
              });
        }
    addChild(child:Component) {
        const container = this.element.querySelector(`.page-item__body`)! as HTMLElement
        child.attachTo(container)
    }
    setOnCloseHandler(handler: OnCloseHandler) {
        this.closeHandler = handler
    }
    onDragStart(_:DragEvent){
        this.notifyDragObservers('start');
        this.element.classList.add('lifted')
    }
    onDragLeave(_:DragEvent){
        this.notifyDragObservers('leave')
        this.element.classList.remove('drop-area')
    }
    onDragEnter(_:DragEvent){
        this.notifyDragObservers('enter')
        this.element.classList.add('drop-area')
    }
    onDragEnd(_:DragEvent){
        this.notifyDragObservers('stop')
        this.element.classList.remove('lifted')
    }
    notifyDragObservers(state: DragState){
        this.dragStateListener && this.dragStateListener(this,state)
    }
    setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>){
        this.dragStateListener = listener
    }
    muteChildren(state:'mute'|'unmute'){
        if(state === 'mute'){
            this.element.classList.add('mute-children')
        }else{
            this.element.classList.remove('mute-children')
        }
    }
    getBoundingRect(): DOMRect {
        return this.element.getBoundingClientRect();
    }
    onDropped(){
        this.element.classList.remove('drop-area')   
       }
}

export class PageComponent extends BasicComponent<HTMLUListElement> implements Composable{

    private children = new Set<SectionContainer>();
    private dropTarget?: SectionContainer;
    private dragTarget?: SectionContainer;

    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`<ul class="page"></ul>`)
        this.element.addEventListener('dragover',(event:DragEvent)=>{
            this.onDragOver(event);
        })
        this.element.addEventListener('drop',(event:DragEvent)=>{
            this.onDrop(event);
        })
    }

    onDragOver(event:DragEvent){
        event.preventDefault()
    }
    onDrop(event:DragEvent){
        event.preventDefault()
        if(!this.dropTarget){
            return;
        }
        if(this.dragTarget && this.dragTarget !== this.dropTarget){
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect()

            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget,dropY < srcElement.y ? 'beforebegin':'afterend')
        }
        this.dropTarget.onDropped();
    }

    addChild(section: Component) {
        const item  = new this.pageItemConstructor();
        item.addChild(section)
        item.attachTo(this.element,'beforeend')
        item.setOnCloseHandler(()=>{
            item.removeFrom(this.element);
            this.children.delete(item)
        })
        this.children.add(item);
        item.setOnDragStateListener((target:SectionContainer,state:DragState)=>{
            switch(state){
                case'start':
                    this.dragTarget = target
                    this.updateSections('mute');
                    break;
                case `stop`:
                    this.dragTarget = undefined
                    this.updateSections('unmute');
                    break
                case `enter`:
                    this.dropTarget = target
                    break
                case `leave`:
                    this.dropTarget = undefined
                    break
                default:
                    throw new Error(`Unsupported State: ${state}`)
            }
        })
    }
    private updateSections(state: 'mute'|'unmute'){
        this.children.forEach((section:SectionContainer)=>{
            section.muteChildren(state);
        })
    };
} 
import { Component } from "./Components/component.js";
import { InputDialog, MediaData, TextData } from "./Components/dialog/dialog.js";
import { MediaSectionInput } from "./Components/dialog/input/media-input.js";
import { TextSectionInput } from "./Components/dialog/input/text-input.js";
import { ImageComponent } from "./Components/Page/item/image.js";
import { NoteComponent } from "./Components/Page/item/note.js";
import { TodoComponent } from "./Components/Page/item/todo.js";
import { VideoComponent } from "./Components/Page/item/video.js";
import { Composable, PageComponent,PageItemComponent } from "./Components/Page/page.js";

type InputComponentConstructor<T= (MediaData | TextData) & Component > ={
    new (): T;
}

class App {
    private readonly page:Component & Composable;
    constructor(appRoot: HTMLElement,private dialogRoot:HTMLElement){
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot)

        this.bindElementToDialog<MediaSectionInput>('#new-image',MediaSectionInput, (input:MediaSectionInput)=> new ImageComponent(input.title,input.url))
        this.bindElementToDialog<MediaSectionInput>('#new-video',MediaSectionInput, (input:MediaSectionInput)=> new VideoComponent(input.title,input.url))
        this.bindElementToDialog<TextSectionInput>('#new-note',TextSectionInput, (input:TextSectionInput)=> new NoteComponent(input.title,input.body))
        this.bindElementToDialog<TextSectionInput>('#new-todo',TextSectionInput, (input:TextSectionInput)=> new TodoComponent(input.title,input.body))
        // For Demo
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
        this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/jmI6_BnYons?list=RDjmI6_BnYons'));
        this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
        this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/jmI6_BnYons?list=RDjmI6_BnYons'));
        this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    }
    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector:string, 
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T)=>Component) {
        const element = document.querySelector(selector)! as HTMLButtonElement
        element.addEventListener('click',()=>{
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.addChild(input)
            dialog.attachTo(this.dialogRoot)

            dialog.setOncloseListener(()=>{
                dialog.removeFrom(this.dialogRoot)
            })

            dialog.setOnsubmitListener(()=>{
                const image = makeSection(input);
                this.page.addChild(image)
                dialog.removeFrom(this.dialogRoot)
            })
        })   
    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body)
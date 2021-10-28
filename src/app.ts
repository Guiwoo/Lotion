import { Component } from "./Components/component.js";
import { ImageComponent } from "./Components/Page/item/image.js";
import { NoteComponent } from "./Components/Page/item/note.js";
import { TodoComponent } from "./Components/Page/item/todo.js";
import { VideoComponent } from "./Components/Page/item/video.js";
import { Composable, PageComponent,PageItemComponent } from "./Components/Page/page.js";

class App {
    private readonly page:Component & Composable;
    constructor(appRoot: HTMLElement){
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot)

        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300')
        this.page.addChild(image)
        
        const note = new NoteComponent('DoSomething',"Note Body")
        this.page.addChild(note)

        const todo = new TodoComponent('Apply Sappy', "DO something")
        this.page.addChild(todo)

        const video = new VideoComponent('VideoTitle', "https://www.youtube.com/watch?v=jmI6_BnYons")
        this.page.addChild(video)
    }
}

new App(document.querySelector('.document')! as HTMLElement)
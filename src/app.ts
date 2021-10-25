import { ImageComponent } from "./Components/Page/item/image.js";
import { NoteComponent } from "./Components/Page/item/note.js";
import { TodoComponent } from "./Components/Page/item/todo.js";
import { VideoComponent } from "./Components/Page/item/video.js";
import { PageComponent } from "./Components/Page/page.js";

class App {
    private readonly page:PageComponent;
    constructor(appRoot: HTMLElement){
        this.page = new PageComponent();
        this.page.attachTo(appRoot)

        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300')
        image.attachTo(appRoot,'beforeend');
        
        const note = new NoteComponent('DoSomething',"Note Body")
        note.attachTo(appRoot,'beforeend')

        const todo = new TodoComponent('Apply Sappy', "DO something")
        todo.attachTo(appRoot,'beforeend')

        const video = new VideoComponent('VideoTitle', "https://www.youtube.com/watch?v=jmI6_BnYons")
        video.attachTo(appRoot,'beforeend')
    }
}

new App(document.querySelector('.document')! as HTMLElement)
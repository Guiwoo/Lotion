import { PageComponent } from "./Components/Page/page.js";

class App {
    private readonly page:PageComponent;
    constructor(appRoot: HTMLElement){
        this.page = new PageComponent();
        this.page.attachTo(appRoot)
    }
}

new App(document.querySelector('.document')! as HTMLElement)
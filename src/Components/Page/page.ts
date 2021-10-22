import { BasicComponent } from "../component.js";

export class PageComponent extends BasicComponent<HTMLUListElement>{
    constructor() {
        super(`<ul class="page">This is PageComponent</ul>`)
    }
} 
import { BasicComponent } from "../../component.js";

export class ImageComponent extends BasicComponent<HTMLElement>{
    constructor(title:string, url:string){
    super(`<section class="image">
                <div calass="image__holder">
                    <img class="image__thumbnail"/>
                </div>
                <h2 class="image__title"></p>
            </section>`)
    const imageElement =this.element.querySelector(`.image__thumbnail`)! as HTMLImageElement
    imageElement.src = url
    imageElement.alt = title;

    const titleElement = this.element.querySelector(`.image__thumbnail`)! as HTMLParagraphElement
    titleElement.textContent = title;
    }
}
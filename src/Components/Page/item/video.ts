import { BasicComponent } from "../../component.js";

export class VideoComponent extends BasicComponent<HTMLElement>{
    constructor(title:string, url:string){
        super(`<section class="video">
        <div class="video__player">
            <iframe class="video__iframe" width="510" height="330"></iframe>
        </div>
        <h2 class="video__title"></h2>
    </section>`);
        

        const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement
        iframe.src = this.convertToEmbeddedURL(url)

        const titleEl = this.element.querySelector('.video__title')! as HTMLHeadingElement
        titleEl.textContent = title
    }
    private convertToEmbeddedURL(url:string) :string {
        console.log(url)
        // const videoId = 'k3-jg'
        return 'eh'
    }
}


// <iframe 
// width="910" 
// height="512" 
// src="https://www.youtube.com/embed/NBgLUCVBEuo" 
// title="YouTube video player" 
// frameborder="0" 
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
// allowfullscreen />
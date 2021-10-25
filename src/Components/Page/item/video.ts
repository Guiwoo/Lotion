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
    //정규표현식 Regex ? 패스워드 이메일 또는 전화번호
    private convertToEmbeddedURL(url:string) :string {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-_]{11}))|(?:youtu.be\/([a-zA-Z0-9-_]{11})))/
        const match = url.match(regExp)
        const videoId = match ? match[1] || match[2] : undefined
        console.log(videoId)
        if(videoId){
            return `https://www.youtube.com/embed/${videoId}`
        }
        return url
    }
}
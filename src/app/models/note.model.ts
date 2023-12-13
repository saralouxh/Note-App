export class Note {
    public id: any;
    public title: string;
    public content: string;

    constructor(id: any, title: string, content: string){
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
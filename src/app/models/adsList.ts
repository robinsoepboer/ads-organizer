import Ad from "./ad";

export default class AdList {
    constructor(
        public id: number,
        public title: string = '',
        public ads: Ad[] = []
    ){}

    
}
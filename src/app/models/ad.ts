export default class Ad {
    constructor(
        public title: string,
        public link: string,

        public description: string = '',
        public id: number = 0
    ){}
}
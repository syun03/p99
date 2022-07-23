export default class Maze {
    question:string = "";
    level:string = "add";

    constructor() {
    }

    randI(i:number): number {
            return Math.floor(Math.random() * i);
    }

    init() {
    }

    main() {
        this.question = this.createQuestion();
    }

    clear() {
    }

    createQuestion() : string {
        if(this.level == "add") return this.randI(10) + " + " + this.randI(10);
        if(this.level == "sub") return this.randI(10) + " - " + this.randI(10);
        if(this.level == "multi") return this.randI(10) + " * " + this.randI(10);

        return "";
    }

    check(result: string) : boolean {
        let ret = false;
        try {
            ret = eval(this.question + "==" + result);
        }catch(e) {
            console.log(e);
        }
        return ret;
    }
}

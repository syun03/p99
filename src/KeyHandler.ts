export default class KeyHandler {
    owner: any|null = null;

    constructor(owner: any) {
        this.owner = owner;

        const self = this;
        document.addEventListener('keydown', (e)=>{self.onKeyDown(e)});
    }
    onKeyDown(event: KeyboardEvent) {
        if(event.repeat) return;
        switch(event.key) {
            case ' ': this.owner.start!(); break;
            case 'o': this.owner.btnOpend!(); break;
            case 'c': this.owner.btnClosed!(); break;
        }
    }
}

/**
 * メイズ生成アルゴリズム
 *
 * 1. 二次元配列を生成
 * 2. 壁を生成
 * 3. ランダムに壁を生成
 *      3.1. ランダムに未結線の点を選ぶ
 *      3.2. 近くに結線済の点があない場合 3.1 に戻る
 *      3.3. 近くの結線済の点と結線する
 *      3.4. ランダムな隣の未結線な点を結ぶ
 *      3.4. 隣に未結線な点がない場合 3.1. に戻る。
 *
 * 0
 * 1 : 左壁と接続
 * 2 : 右壁と接続
 * 4 : 横壁
 * 8 : 縦壁
 */

type ILine = {
    p0: number;
    p1: number;
};

export default class Maze {
    size: number = 10;
    board: Array<number> = new Array();
    closed = false;
    shift: { [key: number]: {p0:number, p1:number} } = [];
    shiftTypes: Array<number> = new Array();

    constructor() {
        this.clear();
    }

    // 異常系時の例外処理
    fatalError(msg:string) {
        throw msg;
    }

    randI(i:number): number {
        return Math.floor(Math.random() * i);
    }

    line(p0:number, p1:number) {
        if((this.board[p0] & 3) == 0) this.fatalError("zero");
        if((this.board[p1] & 3) != 0) this.fatalError("not zero");
        this.board[p1] = this.board[p0] & 3;

        const s = this.shift[p1-p0];
        this.board[p0] |= s.p0;
        this.board[p1] |= s.p1;
    }

    p(x:number, y:number): number {
        return y*this.size+x;
    }

    getCell(x: number, y:number): String {
        return "c" + (this.board[this.p(x,y)] & 12);
    }

    getRandP(): number {
        // FIXME: sorted rand にする。
        return this.p(this.randI(this.size-2)+1, this.randI(this.size-2)+1);
    }

    // ゴールに繋がれなくする
    close() {
        for(let i=0;i < this.size * this.size; i++) {
            const p1 = this.getRandP();
            const s = this.shiftTypes[this.randI(4)];
            const p0 = p1 + s;

            if((this.board[p1] & 3) != (this.board[p0] & 3)) {
                const s = this.shift[p1-p0];
                this.board[p0] |= s.p0;
                this.board[p1] |= s.p1;
                return;
            }
        }
    }

    init() {
        this.shiftTypes = [1,-1,this.size,-this.size];

        this.shift[ 1] = {p0:4, p1:0};
        this.shift[-1] = {p0:0, p1:4};
        this.shift[ this.size] = {p0:8, p1:0};
        this.shift[-this.size] = {p0:0, p1:8};

        const shiftTypes = [1,-1,this.size,-this.size];

        //// 1. 変数を初期化
        this.board = new Array();
        for(let x=0; x<this.size; x++) {
            for(let y=0; y<this.size; y++) {
                this.board.push(0);
            }
        }

        //// 2. 壁を生成new Array();
        this.board[this.p(0,0)] = 1;
        this.board[this.p(this.size-1,0)] = 2;

        for(let y=0; y<this.size-1; y++) {
            this.line(this.p(0, y), this.p(0, y+1)); // 左壁
            this.line(this.p(this.size-1, y), this.p(this.size-1, y+1)); // 右壁
        }

        for(let x=1; x<this.size-1; x++) {
            this.line(this.p(this.size-x,0), this.p(this.size-x-1,0)); // 上壁
            this.line(this.p(x-1,this.size-1), this.p(x,this.size-1)); // 下壁
        }
    }

    /**
     * p0 : 何もない点
     * p1 : 既存の壁である点
     * @returns
     */
    getRandP2(): ILine | null {
        for(let i=0;i < this.size * this.size; i++) {
            const p1 = this.getRandP();
            if((this.board[p1] & 3) == 0) {
                const s = this.shiftTypes[this.randI(4)];
                const p0 = p1 + s;
                if((this.board[p0] & 3) != 0) {
                    return {p0:p0, p1:p1};
                }
            }
        }
        return null;
    }

    show() {
        let body = "";
        for(let y=0; y<this.size; y++) {
            let l = "";
            for(let x=0; x<this.size; x++) {
                const v = this.board[this.p(x, y)];
                let c = "?";
                switch(v & 12) {
                    case  0: c = " "; break;
                    case  4: c = "╺"; break;
                    case  8: c = "╷"; break;
                    case 12: c = "┌"; break;
                }
                l += c;
            }
            body += (l + ":" + y + "\n");
        }
    }

    clear() {
        this.init();
    }

    main() {
        this.clear();

        for(let i=0; i<(this.size-2) * (this.size-2); ) {
            const pt = this.getRandP2();
            if(pt !== null) {
                const pt2:ILine = pt!;

                this.line(pt2.p0, pt2.p1);
                i++;
            }
        }

        this.closed = (this.randI(10)<5);

        if(this.closed) this.close();

        this.show();
    }
}

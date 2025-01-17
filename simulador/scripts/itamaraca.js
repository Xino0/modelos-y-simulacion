export class Itamaraca {

    constructor({ N, s0, s1, s2, xrn }) {
        
        this.N = N;

        this.s0 = s0;
        this.s1 = s1;
        this.s2 = s2;

        this.xrn = xrn;

        this.nextY = this.s2
        this.result = [];
    }

    nProcess({ x, y }) {
        return Math.abs(x - y);
    }

    finalCalculation({ N, Pn, xrn}){
        return Math.abs( N - (Pn * xrn) )
    }

    next(){
        
        const s1 = this.s1;
        const s2 = this.s2;

        const N = this.N;
        const xrn = this.xrn;

        const x = this.s0
        const y = this.nextY

        const Pn = this.nProcess({ x, y });
        const FRNS = this.finalCalculation({ N, Pn, xrn });

        this.s0 = FRNS;
        this.result.push(FRNS);
        this.nextY = (this.nextY === this.s2) ? this.s1 : this.s2;

        return FRNS;
    }

    all(){
        return this.result;
    }
}
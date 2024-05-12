 export default class MinHeap {
    public length: number;
    private data: number[]
    

    constructor() {
        this.data = []
        this.length = 0
    }

    insert(value: number): void {

}
    delete(): number {

}
private heapifyUp(index:number){
    if(index===0){
        return;
    }
    const p = this.parent(index)
    const parentV = this.data[0]
    const v = this.data[p]
    if(parentV>v){
        this.heapifyUp(p);
            this.data[index]= parentV
            this.data[p] = v
            this.heapifyUp(p)
    }
}
private heapifyDown(idx:number){
    if(idx>=this.length){
        return
    }
}
private parent(index:number):number{
    return Math.floor((index-1)/2)
}

private leftChild(index:number):number{
    return index * +1
}

private rightChild(index:number):number{
    return index * + 2
}
}
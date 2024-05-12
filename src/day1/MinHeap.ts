export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value; //add to end of array
        this.heapifyUp(this.length++); //start from the last one(and add one to length. same as this.length++ in the next line.baaam!)
    }
    delete(): number {//by delete we mean deleting the head
        if (this.length === 0) {
            return -1; //classic
        }
        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }
    private heapifyUp(idx: number) {
        if (idx === 0) {
            return;
        }
        const parentIndex = this.parentIndex(idx);
        const parentValue = this.data[parentIndex];
        const value = this.data[idx];
        if (parentValue > value) {
            this.data[idx] = parentValue;
            this.data[parentIndex] = value;
            this.heapifyUp(parentIndex);
        }
    }
    private heapifyDown(idx: number) {
        const lIndex = this.leftChildIndex(idx);
        const rIndex = this.rightChildIndex(idx);
        //we don't check rightIndex because the insertion is from left to right
        //if the leftIndex is already greater or equal than the length.we reached the end
        if (idx >= this.length || lIndex >= this.length) {
            return;
        }
        const lValue = this.data[lIndex];
        const rValue = this.data[rIndex];
        const value = this.data[idx];
        if (lValue > rValue && value > rValue) {
            //value is greater than smallest child(this case right)
            this.data[rIndex] = value;
            this.data[idx] = rValue;
            this.heapifyDown(rIndex);
        } else if (rValue > lValue && value > lValue) {
            //value is greater than smallest child(this case left)
            this.data[lIndex] = value;
            this.data[idx] = lValue;
            this.heapifyDown(lIndex);
        }
    }
    private parentIndex(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChildIndex(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChildIndex(idx: number): number {
        return idx * 2 + 2;
    }
}

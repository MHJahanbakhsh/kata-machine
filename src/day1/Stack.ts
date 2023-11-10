type SNode<T> = {
    value: T;
    previous?: SNode<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: SNode<T>;
    // private tail?:SNode<T>

    constructor() {
        if (!this.head) {
            this.head = undefined;
            this.length = 0;
        }
    }

    push(item: T): void {
        const node = { value: item } as SNode<T>;
        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }
        node.previous = this.head;
        this.head = node;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1); //to prevent length from going negative
        if (this.length === 0) {
            const head = this.head; //just for the sake of returning the deleted item to the user
            this.head = undefined;
            return head?.value;
        }
        const head = this.head;
        this.head = head?.previous;

        //in more traditional language you have to clean the "head"

        return head?.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}

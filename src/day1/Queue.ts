type QNode<T> = {
    value: T;
    next?: QNode<T>;
};

//REMEMBER QUEUE is first-in-first-out
export default class Queue<T> {
    public length: number;
    private head?: QNode<T>;
    private tail?: QNode<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    //someone entered at the end of queue
    enqueue(item: T): void {
        const node = { value: item } as QNode<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;

            return;
        }
        //think about tail as a floating pointer outside of the queue itself
        //everytime we set the tail's next property to the node which
        this.tail.next = node; 
        this.tail = node; //for second item obviously head.next = tail. but in the long run nope
    }
    deque(): T | undefined {
        //remove the first person that came to queue(nobate aval)
        if (!this.head) return undefined;

        this.length--;
        const head = this.head;
        this.head = this.head.next;

        //we don't need to do this since js has garbage collection and does this by itself but we do
        //it anyway for the sake of better explanation
        head.next = undefined;

        if (this.length === 0) {
            this.tail = undefined;
        }
        return head.value;
    }
    peek(): T | undefined {
        //reads the head
        return this.head?.value;
    }
}

const myq = new Queue();
myq.enqueue(3);
myq.enqueue(4);
myq.enqueue(5);
myq.enqueue(6);
// console.log(myq);

type Node<T>{
    value: T
    next:Node<T>
    prev?:Node<T>
}


export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>
    private tail  = Node<T>


    constructor() {
        this.length = 0
        this.head = undefined
    }

    prepend(item: T): void {
        const node = {value: item} as Node<T>
        ++this.length
        if(!this.head){
            this.head = node
            return;
        } 
        node.next = this.head
        this.head.prev = node       
}
    insertAt(item: T, idx: number): void {
        
        if(idx+1>this.length || idx<0){
            throw new Error('index is out of range!')
        }
        else if(idx === this.length){
            this.append(item)
            return;
        }else if(idx===0){
            this.prepend(item)
        }
        this.length++
        let curr = this.head
        for(let i = 0; curr && i<idx;++i){
            curr = curr.next
        }
        curr = curr as Node<T> //just to shut-up ts
        const node = {value:item} as Node<T>
        node.next= curr
        node.prev = curr.prev
        curr.prev = node
        if(curr.prev){
            curr.prev.next = node
        }
        

}
    append(item: T): void {
        const node = {value}
         
}
    remove(item: T): T | undefined {

}
    get(idx: number): Node<T> | undefined {
        return this.head

}
    removeAt(idx: number): T | undefined {

}
}
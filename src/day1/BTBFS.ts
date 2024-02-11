//needle is the number we're looking for.

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = [head];

    while(q.length){
        const curr  = q.shift();
        if(!curr) continue

        
        //search
        if(curr?.value===needle){
            return true
        }   

        if(curr?.left){
            q.push(curr.left)
        }
        if(curr?.right){
            q.push(curr.right)
        }

    }
    return false

}
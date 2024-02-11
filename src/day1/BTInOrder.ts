type BinaryNode<T> = {
    value: T;
    left: BinaryNode<T> | null;
    right: BinaryNode<T> | null;
};

function walk(curr:BinaryNode<number> | null, path:number[]):number[]{
    console.log({curr})
    if(!curr){
        return path
    }
    //recurse
    //pre
    
    //recurse
    walk(curr.left,path)
    path.push(curr.value)
    walk(curr.right,path)
    
    //post
    return path
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head,[])
}


export const tree: BinaryNode<number> = {
    value: 20,
    right: {
        value: 50,
        right: {
            value: 100,
            right: null,
            left: null,
        },
        left: {
            value: 30,
            right: {
                value: 45,
                right: null,
                left: null,
            },
            left: {
                value: 29,
                right: null,
                left: null,
            }
        },
    },
    left: {
        value: 10,
        right: {
            value: 15,
            right: null,
            left: null,
        },
        left: {
            value: 5,
            right: {
                value: 7,
                right: null,
                left: null,
            },
            left: null,
        }
    }
};


console.log(in_order_search(tree))
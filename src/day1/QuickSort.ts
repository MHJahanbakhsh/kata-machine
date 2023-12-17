//note that in quick sort on each partition we don't care about order of elements regarding to each other
//only regarding to the pivot. so on each iteration if a value in less than pivot; it gets moved to beginning,no matter if it is bigger than 
//other elements to its right(which they are also less than pivot but there is no guarantee if the first is less than them)
//and thats the whole point actually. we keep going until a partition is left with 3 values. and they are definitely sorted.

function partition(arr:number[],low:number,high:number):number{
    const pivot = arr[high]
    let idx = low-1
    for(let i=low;i<high;++i){
        if(arr[i]<pivot){ //each element needs to be compared with the pivot
            idx++
            //swapping:
            const temp = arr[i]
            arr[i] = arr[idx] //moves the lesser value that we found to the beginning
            arr[idx] = temp
        } 
    }
    idx++
    arr[high] = arr[idx]
    arr[idx] = pivot
    return idx
}

function qs(arr:number[],lo:number,hi:number):void{
    if(lo>=hi){
        return;
    }
    const pivotIdx = partition(arr,lo,hi)
    qs(arr,lo,pivotIdx-1)
    qs(arr,pivotIdx+1,hi)
}

export default function quick_sort(arr: number[]): void {
    qs(arr,0,arr.length-1)
}
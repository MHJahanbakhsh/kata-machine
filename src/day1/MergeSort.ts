const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function mergeSort(array: number[]): number[] {
    if (array.length === 1) {
        return array;
    }

    // Split Array into right and left
    const length = array.length;
    const middle = Math.floor(length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

//left and right are already sorted on their own. 
// now we are going to merge them together while maintaining its sorting attribute sorted way
function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    // we are merging two arrays.let say [1,3,5] & [2,6,12]
    //after while loop breaks, we have this for result: [1,2,3,5]  leftIndex:2 rightIndex:1
    //since we we don't know what items of which array are left;
    //we use code below to kinda concat the remaining items without actually having duplicates in result
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const answer = mergeSort(numbers);

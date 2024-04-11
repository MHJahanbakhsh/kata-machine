Let’s dive into the `mergeSort` algorithm and break it down with your example array `[99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]`. MergeSort is a classic divide-and-conquer algorithm that splits an array into smaller pieces, sorts them individually, and then merges them back together in sorted order. Here’s how it works with your code.

---

### `mergeSort` Function
The `mergeSort` function recursively splits the array into two halves until each subarray has just one element (which is inherently sorted), then merges them back together using the `merge` function.

```typescript
function mergeSort(array: number[]): number[] {
    if (array.length === 1) {
        return array;  // Base case: a single-element array is already sorted
    }

    const length = array.length;
    const middle = Math.floor(length / 2);
    const left = array.slice(0, middle);  // Left half
    const right = array.slice(middle);    // Right half

    return merge(mergeSort(left), mergeSort(right));  // Recursively sort and merge
}
```

#### How It Works
1. **Base Case**: If the array has only one element, return it as is.
2. **Divide**: Split the array into two halves—`left` and `right`—using the middle index.
3. **Conquer**: Recursively call `mergeSort` on both halves.
4. **Combine**: Merge the sorted halves using the `merge` function.

Let’s trace it with `[99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]`:
- **Initial Array**: `[99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]`
- **Middle**: `Math.floor(11 / 2) = 5`
- **Left**: `[99, 44, 6, 2, 1]` (indices 0 to 4)
- **Right**: `[5, 63, 87, 283, 4, 0]` (indices 5 to 10)
- Recurse on `left` and `right`.

This splitting continues:
- `[99, 44, 6, 2, 1]` → `[99, 44]` and `[6, 2, 1]`
  - `[99, 44]` → `[99]` and `[44]`
  - `[6, 2, 1]` → `[6]` and `[2, 1]`
    - `[2, 1]` → `[2]` and `[1]`
- `[5, 63, 87, 283, 4, 0]` → `[5, 63, 87]` and `[283, 4, 0]`
  - And so on, until all subarrays are single elements.

---

### `merge` Function
The `merge` function takes two sorted arrays (`left` and `right`) and combines them into a single sorted array.

```typescript
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

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
```

#### How It Works
1. **Initialize**: Create an empty `result` array and pointers (`leftIndex`, `rightIndex`) starting at 0 for both input arrays.
2. **Compare and Merge**: While both arrays have elements to process:
   - Compare the elements at `left[leftIndex]` and `right[rightIndex]`.
   - Push the smaller one to `result` and increment its respective index.
3. **Handle Leftovers**: After the while loop, one array might still have elements. Concatenate the remaining elements from `left` (from `leftIndex` onward) and `right` (from `rightIndex` onward).

#### Example Merge
Let’s merge `[1, 3, 5]` and `[2, 6, 12]` (as in your comment):
- **Initial**: `result = []`, `leftIndex = 0`, `rightIndex = 0`
- **Loop**:
  - `1 < 2` → `result = [1]`, `leftIndex = 1`
  - `3 > 2` → `result = [1, 2]`, `rightIndex = 1`
  - `3 < 6` → `result = [1, 2, 3]`, `leftIndex = 2`
  - `5 < 6` → `result = [1, 2, 3, 5]`, `leftIndex = 3`
- **Loop Ends**: `leftIndex = 3 >= 3`, `rightIndex = 1 < 3`
- **Leftovers**:
  - `left.slice(3)` = `[]` (empty)
  - `right.slice(1 '

)` = `[6, 12]`
- **Result**: `[1, 2, 3, 5].concat([]).concat([6, 12])` = `[1, 2, 3, 5, 6, 12]`

---

### Full Trace with Your Array
Starting with `[99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]`:
1. **Split**: `[99, 44, 6, 2, 1]` and `[5, 63, 87, 283, 4, 0]`
2. **Recurse on Left**:
   - `[99, 44]` → `[99]` and `[44]` → `merge([99], [44])` = `[44, 99]`
   - `[6, 2, 1]` → `[6]` and `[2, 1]` → `[2]` and `[1]` → `merge([2], [1])` = `[1, 2]` → `merge([6], [1, 2])` = `[1, 2, 6]`
   - `merge([44, 99], [1, 2, 6])` = `[1, 2, 6, 44, 99]`
3. **Recurse on Right**:
   - `[5, 63, 87]` → `[5]` and `[63, 87]` → `merge([63], [87])` = `[63, 87]` → `merge([5], [63, 87])` = `[5, 63, 87]`
   - `[283, 4, 0]` → `[283]` and `[4, 0]` → `merge([4], [0])` = `[0, 4]` → `merge([283], [0, 4])` = `[0, 4, 283]`
   - `merge([5, 63, 87], [0, 4, 283])` = `[0, 4, 5, 63, 87, 283]`
4. **Final Merge**: `merge([1, 2, 6, 44, 99], [0, 4, 5, 63, 87, 283])`
   - `result = [0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283]`

---

### Final Output
After all recursive calls and merges, `mergeSort(numbers)` returns `[0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283]`. The algorithm guarantees a sorted array by breaking it down to the smallest units and building it back up in order. It’s efficient (O(n log n)) and stable, making it a great choice for sorting!
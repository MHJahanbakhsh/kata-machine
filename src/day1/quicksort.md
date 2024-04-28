Let me explain the partition function in the context of QuickSort, breaking it down step-by-step.

The partition function is the core of the QuickSort algorithm. Its main job is to take an array (or a portion of it defined by `low` and `high` indices) and rearrange it around a chosen pivot value so that:
- All elements less than the pivot are moved to its left
- All elements greater than or equal to the pivot are moved to its right
- The pivot ends up in its final sorted position

Here's how the provided `partition` function works:

```typescript
function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high]  // Choose the last element as pivot
    let idx = low - 1        // idx tracks the boundary of elements less than pivot

    // Iterate through the subarray from low to high-1
    for(let i = low; i < high; ++i) {
        if(arr[i] < pivot) { // If current element is less than pivot
            idx++            // Move the boundary forward
            
            // Swap arr[i] with arr[idx]
            const temp = arr[i]
            arr[i] = arr[idx]
            arr[idx] = temp
        }
    }

    // Place pivot in its final position
    idx++
    arr[high] = arr[idx]
    arr[idx] = pivot
    
    return idx  // Return pivot's final position
}
```

### Step-by-Step Explanation
Let’s walk through it with your example array: `[1, 2, 5, 4, -1, -2, 3]`.

1. **Initial Call**: `partition(arr, 0, 6)`
   - `low = 0`, `high = 6`
   - Pivot = `arr[high] = arr[6] = 3`
   - `idx = low - 1 = 0 - 1 = -1` (boundary starts before the array)

2. **Loop through elements** (from `i = 0` to `i < 6`):
   - Compare each element with pivot (`3`):
     - `i = 0`: `arr[0] = 1 < 3`
       - `idx = 0`, swap `arr[0]` and `arr[0]` (no change: `[1, 2, 5, 4, -1, -2, 3]`)
     - `i = 1`: `arr[1] = 2 < 3`
       - `idx = 1`, swap `arr[1]` and `arr[1]` (no change: `[1, 2, 5, 4, -1, -2, 3]`)
     - `i = 2`: `arr[2] = 5 > 3` (no swap, `idx` stays 1)
     - `i = 3`: `arr[3] = 4 > 3` (no swap, `idx` stays 1)
     - `i = 4`: `arr[4] = -1 < 3`
       - `idx = 2`, swap `arr[4]` and `arr[2]`: `[1, 2, -1, 4, 5, -2, 3]`
     - `i = 5`: `arr[5] = -2 < 3`
       - `idx = 3`, swap `arr[5]` and `arr[3]`: `[1, 2, -1, -2, 5, 4, 3]`

3. **Place the Pivot**:
   - After the loop, `idx = 3`
   - `idx++` → `idx = 4`
   - Swap pivot (`3`) into position: `arr[high] = arr[6]` with `arr[4]`
   - Before: `[1, 2, -1, -2, 5, 4, 3]`
   - After: `[1, 2, -1, -2, 3, 4, 5]`
   - Pivot (`3`) is now at index 4, its final sorted position.

4. **Return**: `idx = 4` (the pivot’s position)

### Key Points
- **Purpose**: The partition function doesn’t sort the entire array—it just ensures the pivot ends up in its correct spot, with smaller elements to its left and larger elements to its right.
- **Order Doesn’t Matter**: Within the "less than pivot" section (left of pivot) and "greater than or equal to pivot" section (right of pivot), the elements aren’t sorted relative to each other yet. That’s handled by recursive calls to QuickSort.
- **Result**: After this partition, the array is split into two parts:
  - Left: `[1, 2, -1, -2]` (all < 3)
  - Pivot: `3`
  - Right: `[4, 5]` (all > 3)
- The function returns the pivot’s index (`4`), which is used by `qs` to recursively sort the left (`0 to 3`) and right (`5 to 6`) subarrays.

### Why It Works
The beauty of this partition scheme (called Lomuto’s partition) is its simplicity:
- It uses a single pointer (`idx`) to track where the next "less than pivot" element should go.
- By the end, all elements before `idx` are less than the pivot, and all elements after are greater than or equal to it.
- The pivot is then swapped into the `idx` position, finalizing the partition.

This process repeats recursively in the `qs` function until the entire array is sorted, resulting in `[-2, -1, 1, 2, 3, 4, 5]` for your example.
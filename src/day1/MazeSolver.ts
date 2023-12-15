const dirs = [
    [0,1],
    [1,0],
    [0,-1],
    [-1,0]
]

function walk(maze: string[], wall: string, current: Point, end: Point, seen:boolean[][],path:Point[]): boolean {
    console.log('walk invoked with the current: ',current)
      //3. are we reach the end?
      if(current.x===end.x && current.y === end.y){
        console.log('i only invoke once')
        path.push(end)
        return true
    }

    //1. Base Case: are we off the map?
    if (
        (current.x < 0 || current.x >= maze[0].length) ||
        (current.y < 0 || current.y >= maze[0].length)
    ) return false;

    
    /*
        argument maze seems like a one dimensional array but since each element is string and
        we use string indexing; we are interpreting it as a two dimensional array.baaam!
    */
   //2.are we on the wall?
    if (maze[current.y][current.x] === wall) {  //its reeeally important that we are accessing the y and then x
        return false                            //in our test we have six strings(y).each strings containing 10 characters(x)
    }

  
    //4. repetitive case
    if(seen[current.y][current.x]){
        return false
    }

    //----------------------------------------------------------------------------------------------------------
    //we call previous 4 steps the BASE CASE. we should always move things to base case as much as possible to reduce complexity
    //if we didn't do this; we would have do al those if/else above instead of the recurse case loop below!:
    //-----------------------------------------------------------------------------------------------------------


    //now lets Recurse: on the first iteration we reach to below codes because technically none of codes above make a return
    //1.pre 
    seen[current.y][current.x] = true 
    path.push(current)
    //2.recurse
    for(let i =0;i<dirs.length;++i){
        const [x,y] = dirs[i]
        console.log('iterating: ',x,y)

        if(walk(
            maze,wall,
            {
                x:current.x + x, //here we are calling the function with different "current"
                y:current.y + y
            },
            end,seen,path)){
                console.log('intrestingly we see this log for as many path walk we go BUT at the end when stack trace!',current)
            return true  //this only returns true if the walk function returns true and walk function returns true if                         // one of its base cases returns true and that case is reaching the end
        }                //if not, it iterates all 4 scenarios and it pops the path and start from where it was.
    }
    //before we reach down below each call in for loop, make another call to itself!
    
    //3.post. this portion only gets called if we have to go back and we face blockage?
    console.log('now lets shine')
    path.pop()
    return false
}


export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen : boolean[][] =  []
    const path: Point[] = [];
    for(let i=0;i<maze.length;++i){
        seen.push(new Array(maze[0].length).fill(false))
    }

    //from invoking for loop, it kinda starts branching.and thats when we always should look for recursion
    //and each branch pushes and pops to path?
    walk(maze,wall,start,end,seen,path)
    return path
}
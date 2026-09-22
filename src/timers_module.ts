

// settimeout setinterval cleartimeout clearinterval is same as before .

import { log } from "node:console";

//set immidiate
//setimmidiate will run imidiately after the synchronous code runs 

console.log("1 start");
setTimeout(() => {
        console.log("this is inside settimeout so asynnc code..");
        
}, 1000);

console.log("in code this line is in between settimeout and setimmediate");


setImmediate(()=>{
    console.log("this is inside setimmidiate so it runs after sync code finishes");
    
})

console.log("this is the last line of code");

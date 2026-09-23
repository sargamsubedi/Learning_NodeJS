
//use buffers when we are going to use raw binary data
/* 
binary data means when the data is stored in bytes

when to use buffers:
    reading files, receiving http req bodies, working with streams,
    handling images,pdfs files, videos
    encrypt and hashing
*/
/* 
string => human readable 
buffer=> raw binary data
*/

import { log } from "node:console";


const bufferText = Buffer.from("NODE")
// each char is of 1 byte so it is of 4 byte , in hex format
console.log(bufferText); // op: <Buffer 4e 4f 44 45>

// to convert back into text
console.log(bufferText.toString("utf-8"));

console.log(bufferText.length); // log 4

//creating fixed buffer i.e allocate

let fixedBuffer = Buffer.alloc(5)
console.log("empty fixed buffer: ",fixedBuffer);

//writing things into fixed buffer
fixedBuffer.write("SG")

console.log("fixedd buffer after write: ",fixedBuffer); 
console.log("fixedd buffer content after converted to string : ",fixedBuffer.toString("utf-8")); 


//concating chunks 

let chunks =[
    Buffer.from("hello"),
    Buffer.from(" sargam "),
    Buffer.from("subedi"),
]
 let combinedBuffer = Buffer.concat(chunks)

 console.log("combined buffer: ",combinedBuffer);
 console.log("combined buffer translate into string: ",combinedBuffer.toString("utf-8"));
 


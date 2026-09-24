
//handle the data piece by piece i.e chunks
/* 
eg: read/dowmload files, upload files
audio,video processing
*/

import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

/* 
types of stream 
readble stream -> has  source from which data is read. like reading big file
writable stream ->has a destination where the data is written
transform stream -> read the data , transform it and pass it forward , eg:compression
*/

let data = ["hello ", "i ", "am ", "sargam"]
//treats each array elements into each chunks
let readStream = Readable.from(data);

const upperCase = new Transform({
    transform(chunk, encoding, callback) {

        console.log("received Data:", chunk.toString());
        let result = chunk.toString().toUpperCase();

        //passing data to writable using callback
        callback(null, result)
    }
})

const writeStream = new Writable({

    write(chunk, encoding, callback) {

        console.log("the writestream received:", chunk.toString());

        callback()// calling callback means write operation is finished , give it another chunk
    }

})

async function main(): Promise<void> {

    try {
        //pipeline connects the read, transform and write streams
        await pipeline(readStream, upperCase, writeStream)
    }
    catch (error) {
        let msg = error instanceof Error? error.message :"unknown error occurred"
        console.error(msg);
        
    }

}

main();
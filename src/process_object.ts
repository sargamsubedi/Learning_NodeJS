
//env variables
//command line args
//exit code
//process lifecycle events  

import { log } from "node:console";
import process, { exit } from "node:process"

//ENV FILE

const URL= process.env.BASE_URL ?? "https://dummyjson.com" //helps to read env file

//process.env values are either string or undefined
const port = Number(process.env.PORT ?? 3000);


//ARGV
// process.argv is a built in property that returns array of command line arguments 
//process.argv[2] is first custom argument because 0&1 are reserved by nodejs

/*
how process.argv looks
[
    "path to node"
    "path of file " in this case "src\process_object.ts"
    "from here custom arguments"
]
    */

const shouldFail = process.argv.includes("--fail") //fail flag

//exit

// dont start async here(before process.on exit) because node is already shutting down.
//works on synchronous code, 

//use for final log, final cleanup

//this is event triggered when exit called

process.on("exit",(code)=>{
console.log(`process finished with exit code: ${code}`);
})

process.exit(0) // 0 means success so there is no error
process.exit(1) // 1 means failure so there is some error


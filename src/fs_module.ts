
//fs - file system 
//used to create read,write,delete,check details contents in file/folder

import { error, log } from "node:console";
import fs from "node:fs";
import path from "node:path";
import fsPromise from "node:fs/promises";

//1.by  using sync apis 

// async method
//2.by  using callback apis 
//3.by  using promise apis 


/* 
use sync api when building scripts,local demos , small startup scripts

not use it in http request handler, when there is high traffic, handling background jobs
because sync appi blocks the main thread so it will make freeze the app 
*/

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "sync-note.txt")
const CALLBACK_FILE_PATH = path.join(DEMO_FOLDER_PATH, "callback-note.txt")
const PROMISE_FILE_PATH = path.join(DEMO_FOLDER_PATH, "promise-note.txt")

type FileResult = {
    style: string
    fileName: string
    content: string
    sizeInByte: number
}

//using sync
function runSyncExample(): FileResult {

    //write into file , if file doesnt exist node will create it , if file exist its going to replace its content

    //the utf-8 is saying we are writing normal text
    fs.writeFileSync(SYNC_FILE_PATH, "created using sync file system", "utf-8")

    //append the content to the end of the files content
    fs.appendFileSync(SYNC_FILE_PATH, " this is appended by using appendfilesync", "utf-8")

    //read file content
    let content = fs.readFileSync(SYNC_FILE_PATH, "utf-8")

    //to get file detail 
    const stats = fs.statSync(SYNC_FILE_PATH);//this is an object stats.size will give filesize

    return {
        style: "sync",
        content: content,
        fileName: path.basename(SYNC_FILE_PATH),
        sizeInByte: stats.size

    }
}

//using callback callback(error,result) //here we are facing callback hell
function runCallbackExample(): Promise<FileResult> {
    return new Promise((resolve, reject) => {
        fs.writeFile(CALLBACK_FILE_PATH, "created using writefile callback", "utf-8", (error) => {

            if (error) {
                reject(error);
                return
            }
            //if writing task is successful
            fs.appendFile(CALLBACK_FILE_PATH, " this is appended using callback", "utf-8", (error) => {
                if (error) {
                    reject(error);
                    return
                }
                //if appending is successful
                fs.readFile(CALLBACK_FILE_PATH,"utf-8",(error,data)=>{
                    if (error) {
                    reject(error);
                    return
                }
                //if there is no error after reading 

                let fileName = path.basename(CALLBACK_FILE_PATH)
                fs.stat(CALLBACK_FILE_PATH,(statError,statValue)=>{
                    if(statError)
                    {
                        reject(statError) 
                        return  
                    }
                    //if there is no error
                    resolve({
                            style:"callback",
                            fileName:fileName,
                            content:data,
                            sizeInByte:statValue.size
                            
                        } ) 
                })

                })
            })
        })
    })
}

//using promise //similar to sync
async function runPromiseExample():Promise<FileResult> {
    
    // write in file
    fsPromise.writeFile(PROMISE_FILE_PATH,"created using writefile promise", "utf-8")

    fsPromise.appendFile(PROMISE_FILE_PATH," appended using promise appendFile","utf-8")

    // read from file
    let filecontent =await fsPromise.readFile(PROMISE_FILE_PATH,"utf-8")
    let stats =await fsPromise.stat(PROMISE_FILE_PATH)
    let filename = path.basename(PROMISE_FILE_PATH);

    return{
        style:"promises",
        content:filecontent,
        fileName:filename,
        sizeInByte:stats.size

    }
    
}


function ensureDemoFolderExists(): void {
    if (!fs.existsSync(DEMO_FOLDER_PATH)) //if folder doesnt exists

    {
        //recursive true means it creates complete folder , without it if parent folder doesnt exist it will give error 
        fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true })
    }
}

async function main(): Promise<void> {
    try {

        //need to ensure the parent folder exist
        ensureDemoFolderExists();
        //call sync file system
        let syncResult = runSyncExample();
        let callbackResult =await runCallbackExample()
        let promisePesult =await runPromiseExample()
        console.log([syncResult,callbackResult,promisePesult]);


    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log("unknown error occurred");
        }
    }
}
main();
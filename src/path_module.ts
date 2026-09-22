
//build and read file path 

import { log } from "node:console";
import path from "node:path";

// doing like this is bad practice
// const path = rootPath + "/uploads"+filename //instead use path module

path.join() // use this because it will use the correct separator for current os 
/* 

(means in mac user/sargam/secret.txt 
but in windows like this c:\user\sargam\secret.txt) so correct separator

*/

// process.cwd() // (cwd=current directory) gives folder from which the nodejs process is started

let projectRoot = process.cwd()
console.log(projectRoot); //D:\learningNodeJS

/* 
lets asssume user is uploading a photo and we want to store it at uploads/users/id/profile.png
*/

let userId= "23"
let originalName= "profile.png"
//create the path string - it doesnt create file nor check if the folder exists
let UploadPath = path.join(projectRoot,"uploads","users",userId,originalName)
console.log(UploadPath);


//reading values 

//gives final part of the path in this case profile.png
let fileName = path.basename(UploadPath);
console.log("final file name from path: ",fileName);

//gives files extention
let extentionName =  path.extname(UploadPath)
console.log("extention name: ",extentionName); //.png

let parentFolder = path.dirname(UploadPath);
console.log(parentFolder); //gives files parent folder, from d: to 23 in this case




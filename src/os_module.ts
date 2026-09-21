

//to check info about device cpu info, memory info etc

import { log } from 'node:console';
import * as os from 'node:os'

console.log("platform", os.platform()); //platform windows,linux etc
console.log("architecture", os.arch()); //cpu architecture x86 etc
console.log("os type", os.type()); //research  difference between platform and type
console.log("os release", os.release()); //os release version
console.log("home directory", os.homedir()); //path of home directory 
console.log("temp directory", os.tmpdir()); //path of temp directory 



//for cpu info 
let cpu = os.cpus()
console.log("cpu count", cpu.length);

if(cpu.length>0)
{
    console.log("cpu model",cpu[0]?.model);
    console.log("cpu speed",cpu[0]?.speed );
    console.log("cpu times",cpu[0]?.times );
    
}

// memory
console.log("total memory in bytes", os.totalmem());
console.log("free memory in bytes", os.freemem());

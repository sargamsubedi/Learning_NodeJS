
//user registered ->event
//action to tale ->send an welcome email,write a log , notify other services etc
/*
event emitter -> emit particular event and event listner listen to the event and handle that event
  */

import EventEmitter from "node:events";

/* 
some methods: 
.on()-> register one listner
.once()=> register one listner that runs only one time
.emit()-> triggers an event and send it to the listner
*/

let registerEvents = new EventEmitter();

type User={
    id:number
    name:string
}

//event name should be same as emitters event name 
registerEvents.on("user:login",(userData:User)=>{
    
    console.log(`new user with name ${userData.name} registered`);
    
})
//can add multiple listner to same event

registerEvents.on("user:login",(userData:User)=>{
    
    console.log(`this is logged by second listener:  ${userData.name} registered`);
    
})

//once -> it will run only once
registerEvents.once("app:start",()=>{
    console.log("app started ...");
    
})

function registerUser():void {

    let user:User={
        id:1,
        name:"sargam"
    }

    registerEvents.emit("user:login",user) // the user is read by callback of listner(i.e on or once)  
}

//its called twice but because of .once it will listen only once so only one log will seen
registerEvents.emit("app:start")
registerEvents.emit("app:start")

registerUser();
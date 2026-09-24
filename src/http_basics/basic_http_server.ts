
import http, { type IncomingMessage, type ServerResponse } from 'node:http'

/* 
key points 
http.createServer creates low level server
the callback function is called every time when it get http request 

*/


//REQUEST:
/* 
req is an object 
req.method -> get,post,put,delete,patch etc
put->replace data, patch->update partial data   

req.url gives the path -> /, /users,/products etc

req.header-> actual metadeta sent by the client

req.body => data sent by client on post,put method
*/


//RESPONSE

/* 
res-> object used to sent info back to the client

we will send status code, response header and response body
*/


let PORT = 3000;
let server = http.createServer((req: IncomingMessage, res: ServerResponse) => {


    //request
    const method= req.method;
    const url= req.url //in which path client is requesting
    const contentType = req.headers['content-type'] //there are several metadata in headers

    //response
    res.statusCode=200;//set http status code 200 means successful
    res.setHeader("content-type","text/plain") //tells client what kind of response are we sending

    res.end("this is the last message") //finish the response i.e done with this request
})
//server started here.. its listen to the client
server.listen(PORT,()=>{
    console.log(`server is now running on port : ${PORT}`);
    
})
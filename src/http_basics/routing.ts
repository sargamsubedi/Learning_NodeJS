import http, { type IncomingMessage, type ServerResponse } from 'node:http'

const PORT = 3001;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    const method = req.method ?? "GET";
    //https://localhost:3001/users => req.url:/users 
    //https://localhost:3001/users?id=2 => req.url:/users?id=2
    const reqUrl = req.url
    const url = new URL(`https://localhost:${PORT}${reqUrl}`)
    let pathName = url.pathname

    if(method==="GET" && pathName==="/users")
    {
        res.statusCode=200
        res.end("here is the list of all users")
        return
    }
    if(method==="GET" && pathName==="/health")
    {
        res.statusCode=200
        res.end("the server is healthy")
        return
    }
    res.statusCode=404
    res.end("sorry the page is not found")
})

server.listen(PORT,()=>{
    console.log("server is started....");
    
})
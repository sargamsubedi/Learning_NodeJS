import http, { type ServerResponse, type IncomingMessage } from 'node:http'
import { runInNewContext } from 'node:vm';

const PORT = 3000;

//data expected from user in this format
type userData = {
    name: string,
    email: string
}

let server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    let method = req.method ?? "GET"

    //it takes 2 args path,base
    // req.headers.host returns the hostname eg: localhost:3000 , example.com etc
    let reqUrl = new URL(req.url ?? "/", `https://${req.headers.host}`)
    let pathName = reqUrl.pathname
    //case insensetive so Content-Type and content-type is same but capital one is better
    res.setHeader("Content-Type", "text/plain");

    if (method === "POST" && pathName === "/users") {


        let chunks: Buffer[] = [];

        //this listner is called whenever node receives the body data;
        req.on("data", (chunk) => {
            chunks.push(chunk)
        });
        //this is called when the node finishes receiving the body i.e got all body data
        req.on("end", () => {
            try {



                let rawBody = Buffer.concat(chunks).toString("utf-8");

                if (!rawBody)//if there is no body data
                {
                    res.statusCode = 400
                    res.end("body data is required");
                    return
                }
                const parsedBody = JSON.parse(rawBody) as userData;

                if (!parsedBody.name || !parsedBody.email) {
                    res.statusCode = 400;
                    res.end("both name and email is required..")
                    return
                }

                res.statusCode = 201
                res.end(`user with name ${parsedBody.name} and email ${parsedBody.email} is created`)
            
            } catch {
                res.statusCode = 400;
                res.end("unexpected error occurred")
            }
        })

        req.on("error",()=>{
            res.statusCode=500;
            res.end("failed to read the body")
        })
        return
    }
    //else case for method=get and pathname =/users

    res.statusCode=404
    res.end("sorry path not found")
})

server.listen(PORT, () => {
    console.log("server started..");


})
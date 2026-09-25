
import http , {type ServerResponse, type IncomingMessage} from 'node:http'

const PORT= 3000;

//type and datas
type User={
    id:number
    name:string
}
type ApiResponse<T>={
    success:boolean
    message:string
    data?:T
    error?:string
}
const users:User[]=[
    {id:1,name:"sargam"},
    {id:2,name:"sangeet"},
    {id:3,name:"shankar"},
];

function sendJson<T>(res:ServerResponse,statusCode:number, body:ApiResponse<T>):void{

    res.statusCode=statusCode
    res.end(JSON.stringify(body))//send the user object in json format
}

//server
let server = http.createServer((req:IncomingMessage, res:ServerResponse)=>{

    const method= req.method ??"GET";
    const reqUrl = new URL(req.url??"/", `https://${req.headers.host}`)
    let pathName = reqUrl.pathname 
    res.setHeader("Content-Type","application/json")

    if(method==="GET" && pathName==="/")
    {
        sendJson(res,200,{
            success:true,
            message:"server is running",
            data:{
                routes:["get/users"]
            }
        })
        return
    }
    if(method==="GET" && pathName==="/users")
    {
        sendJson(res,200,{
            success:true,
            message:"users fetched successfully",
            data:users
        })
        return
    }
    sendJson<null>(res,404,{
        success:false,
        message:`The page ${method}/${pathName} is not found`
    })

})

server.listen(PORT, () => {
    console.log("server started..");
})

function testURL()
{
    let url= new URL("https://sargamsubedi.com/users?page=2&limit=10")

    //getting all url
    console.log("url: ",url.href);
    //getting protocol
    console.log("protocol: ",url.protocol);
    //getting hostname
    console.log("host name: ",url.hostname);
    console.log("path name: ",url.pathname);
    
    //getting queryparams params
    console.log("pages ",url.searchParams.get("page"));
    console.log("limit ",url.searchParams.get("limit"));
    
    //setting search params
    url.searchParams.set("page","4")
    console.log("url: ",url.href);

    //creating queryparams
    let query = new URLSearchParams({
        search:"all",
        sort:"latest",
        page:"1"
    })
console.log(query);

    

    
}

testURL()
//if we are calling an external api and the data format is not in correct form we transform it to our format

//this is the type we are getting
type PlaceholderUser = {
    id: number
    name: string
    email: string
    company: {
        name: string
    }
}

//this is the format we want 
type User = {
    id: number
    name: string
    email: string
    company: string
}

//convert data to required transformation

function transformData(rawUser: PlaceholderUser): User {

    return {
        id: rawUser.id,
        name: rawUser.name,
        email: rawUser.email,
        company: rawUser.company.name
    }
}

//handling external api call using Abort Controller

let PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/users/1"

async function fetchUser(): Promise<void> {

    let controller = new AbortController();

    //wait for 5 sec after that send abort signal 
    let timeOut = setTimeout(() => {
        controller.abort()
    }, 5000);

    try {
        let response = await fetch(PLACEHOLDER_URL, {
            method: "GET",
            signal: controller.signal
        })

        if(!response.ok)
        {
            console.log("error occurred while fetching");
            
        }
        let rawUser = (await response.json()) as PlaceholderUser

        let user = transformData(rawUser);

        console.log(user);
        

    } catch (error) {
        if(error instanceof Error && error.name==="AbortError")
        {
            console.log("fetch request aborted");
        }
        let msg = error instanceof Error? error.message:"unknown error occurred"
        console.log(msg);
    
    }finally{
        clearTimeout(timeOut)
    }

}

fetchUser();
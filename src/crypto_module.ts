// import crypto from 'crypto' both import are same but below is more preferable because it says crypto is built in module 
import { log } from 'node:console'
import crypto from 'node:crypto'

/* 
for security related tasks
used for creating uuids, ids, secure tokens
hashing data
to verify if the data is changed or not 
*/

let id = crypto.randomUUID() //used to generate universally unique id
console.log("crypto randomuuid: ",id);

//used for user verification   the argument is no of random bytes 1 byte=2char in hex 
let randomBytes = crypto.randomBytes(16).toString("hex") //used for password reset token,email verification token 
console.log("Randombytes into hex code:",randomBytes);


//create hash - convert data into fixed length string
let hashOfHello = crypto.createHash("sha256").update("hello").digest("hex")
console.log("hash of hello :",hashOfHello);

//createHMAC
/*
normal hash: data->hash
hmac: data+secret => signed hash

hmac usage eg: in webhook related example ,signed tokens

*/
const secretKey="thisissecretkey"
const message ="thisIsMessage"

const signature = crypto.createHmac("sha256",secretKey).update(message).digest("hex");
console.log("signature using hmac:",signature);

// verify hmac
//instead of message we can pass user input message
const signatureVerify = crypto.createHmac("sha256",secretKey).update(message).digest("hex");
console.log("is password a match: ",signature===signatureVerify);

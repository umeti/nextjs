import crypto from "crypto"

export function enc(data,password,base64=true){
  const key = crypto.createHash("sha256").update(password).digest()
  const iv = crypto.randomFillSync(Buffer.alloc(16))
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  data = Buffer.from(data||"hello")
  const size = data.length
  let makeup = 0
  let last_block = data.length % 32 
  if(last_block != 0){
    makeup = 32 - last_block
    data = Buffer.concat([data,Buffer.alloc(makeup,0)])
  }

  const size_buf = Buffer.alloc(4)
  size_buf.writeInt32LE(size)

  let encrypted = cipher.update(data);
  let res =  Buffer.concat([iv,size_buf,encrypted])
  if(base64)
    return res.toString("base64")
  return res
}

// |iv<16>|size<4>|blocks...<n*256>|
export function dec(encrypted,password,base64=true){
  const data = Buffer.from(encrypted,base64?"base64":undefined)
  const key = crypto.createHash("sha256").update(password).digest()
  const iv = data.slice(0,16)
  if(iv < 16){
    return null
  }
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  const size = data.slice(16,20).readInt32LE(0)

  let decrypted = decipher.update(data.slice(20)).slice(0,size);

  return decrypted
  //
}

export default {enc,dec}

import crypto from "crypto"
import React,{useState} from 'react'
import crypt from "lib/crypt"
import * as comp from 'comp'
Object.assign(global,comp)

function test(){
  const algorithm = 'aes-256-cbc';
  const password = '用于生成密钥的密码';
  //const key = crypto.scryptSync(password, '盐值', 24);
  //const key = "cb3a18b7c6cf2ef2f3c6f735"
  const key = crypto.createHash("sha256").update(password).digest()
  const iv = crypto.randomFillSync(Buffer.alloc(16)); // 初始化向量。

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update('要加密的数据', 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
}



export default function Hello(){
  let [text,setText] = useState("")
  let [password,setPassword] = useState("")
  let [encrypted,setEncrypted] = useState("")
  return (
    <Container>
      <textarea value={text}  onChange={(e)=> setText( e.target.value)} />
      <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <div>
      <button onClick={()=>setEncrypted(crypt.enc(text,password))}>encrypt</button>
      <button onClick={()=>setText(crypt.dec(encrypted,password))}>decrypt</button>
      </div>
      <textarea value={encrypted} onChange={(e)=> setEncrypted(e.target.value)}/>

    </Container>
  )
}

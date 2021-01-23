fetch = require("node-fetch")

export default (req, res) => {


  let p = req.url.indexOf("url=")
  let dest = req.url.substr(p+4)
  if(p == -1){
    res.statusCode = 400
    res.setHeader("access-control-allow-origin","*")
    res.json({message:"Parameter error"})
    return
  }
  let headers = req.headers
  headers.host = new URL(dest).host
  fetch(dest,{
    method: req.method,
    headers: headers
  }).then(dest_res =>{
    console.log(dest_res.status)
    console.log(dest_res.headers)
    res.statusCode = 200
    res.setHeader("access-control-allow-origin","*")
    dest_res.body.pipe(res)
  }).catch(err => {
    res.statusCode = 500
    res.setHeader("access-control-allow-origin","*")
    res.json(err)
  })

}

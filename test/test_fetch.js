
fetch = require("node-fetch")


dest = "http://qq.com"
fetch(dest,{
  method: "GET",
  headers: {}
}).then(res => res.text())
  .then(body => {
    console.log(body)
}).catch(err => {
  console.log(err)
})


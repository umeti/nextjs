import React from 'react'
import * as comp from 'comp'
Object.assign(global,comp)

let example = [
  "av810872",
  "av43426592",
  "av9372087",
  "av2129461",
  "av3905462"
]
let videos = new Map
let setVideos 
export default function Main(){
  return (
    <Container>
      <DataList  />
      <Inputs />
    </Container>
  )
}

class DataList extends React.Component {
  constructor(props){
    super(props)
    this.state = {list:[],message:" "}
  }
  componentDidMount(){
    setVideos = (m) =>{
      this.setState({list:[...m]})
    }
  }

  render(){
    return (
      <ul>
      {this.state.list.map((v,)=>(
        <DataItem key={v[0]} id={v[0]} param={v[1]}/>
      ))}
      </ul>
    )

  }
}

class DataItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {data:{view:0}}
  }

  update(){
    fetch("/api/corsp?url=https://api.bilibili.com/x/web-interface/view?"+this.props.param).then(function(response) {
      return response.json();
    }).then((res) => {
      let view
      try{
        view = res.data.stat.view
      } catch(e){
        view = res.message
      }
        this.setState ({
          data:{
            view:view
          }
        })
    });

  }

  componentDidMount(){
    this.update()
    this.timeID = setInterval(()=>{
      this.update()
    },5000)
  }

  componentDidUnMount(){
    clearInterval(this.timeID)
  }

  render(){
    return (
      <li>
        {this.props.id}
        : {this.state.data.view}
      </li>
    )
  }
}


class Inputs extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return (
      <div>
        <Add />
        <Operate />
      </div>
    )

  }
}

// id: 视频的av号或BV号
function addItem(id){
  if(!id){
    return ""
  }
  let l = id.substr(0,2).toLowerCase()
  let r = id.substr(2)
  let param
  if(l == "av" && /\d+/.test(r)){
    param = "aid="+r
  }else if (l == "bv" && /[a-zA-Z\d]+/.test(r)){
    param = "bvid=BV"+r
  }else{
    return id + " 无效的av/bv号"
  }

  let old_size = videos.size
  videos.set(id,param)
  setVideos(videos)
  if(videos.size == old_size){
    return id + " 已存在列表中"
  }

  return null
}

class Add extends React.Component {
  constructor(props){
    super(props)
    this.state = {message:" ",id:""}
  }
  
  handleClick = () =>{
    let err = addItem(this.state.id)
    if(err){
      this.setState({message:err})
    }else{
      this.setState({message:" ",id:""})
    }
  }

  handleChange = (event) =>{
    this.setState({id: event.target.value})
  }

  render(){
    return (
      <div>
        <input type="text" placeholder="av/BV号" value={this.state.id} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>添加</button>
        <div>{this.state.message}</div>
      </div>
    )

  }
}

function addExample(){
  example.forEach((v)=>{
    addItem(v)
  })
}

function clear(){
  videos.clear()
  setVideos(videos)
}

class Operate extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return (
      <div>
        <button onClick={addExample}>添加示例</button>
        <button onClick={clear}>清空</button>
      </div>
    )

  }
}

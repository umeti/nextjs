import {useState,useEffect} from 'react'
import * as comp from 'comp'
Object.assign(global,comp)

let params = {tz:8}
export default function Hello(){
  return (
    <Container>
      <Example />
      <Clock params={params}/>
    </Container>
  )
}

function Clock({params}){
  let [time,setTime] = useState("--")
  function setTimeFromDateObject(date){
      setTime(`${date.getUTCHours()+params.tz}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`)
      console.log(date.toLocaleTimeString())
  }
  let tid 
  useEffect(()=>{
    tid = setInterval(()=>{
      setTimeFromDateObject(new Date())
    },1000)
    console.log("setInterval:"+tid)
    return () => {
      clearInterval(tid)
      console.log("clearInterval"+tid)
    }
  },[])

  return (
    <div>
      <p>{time}(+{params.tz}:00)</p>
      <button onClick={()=>params.tz +=1}>时区+1</button>
      <button onClick={() => clearInterval(tid)}>停止计时</button>
      <button onClick={()=>setTimeFromDateObject(new Date())}>刷新时间</button>
    </div>
  )
}

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => {setCount(count + 1)}}>
        Click me
      </button>
    </div>
  );
}

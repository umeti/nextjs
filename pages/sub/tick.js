import React from 'react'
import * as comp from 'comp'
Object.assign(global,comp)

export default function Hello(){
  return (
    <Container>
      <Clock />
    </Container>
  )
}

class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state = {date:new Date()}
  }
  tick(){
    this.setState({date:new Date()})
  }
  componentDidMount(){
    this.timeID = setInterval(
      () => this.tick(),
      1000)
  }
  componentWillUnmount(){
    clearInterval(this.TimeID)
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


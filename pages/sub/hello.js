import React from 'react'
import * as comp from 'comp'
Object.assign(global,comp)


export default function Hello(){
  return (
    <Container>
      <Welcome name="Meti Yu" />
      <Welcome name="friend" />
      
    </Container>
  )
}

/*
function Welcome(props){
  return (
    <h1>
      Welcome {props.name}
    </h1>
  )
}
*/
class Welcome extends React.Component {
  render(){
    return (
      <h1>
        Welcome {this.props.name}!
      </h1>
    )

  }
}


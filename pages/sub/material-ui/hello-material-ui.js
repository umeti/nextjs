
import React from 'react'
import * as comp from 'comp'
Object.assign(global,comp)
import Button from '@material-ui/core/Button';
import {Card} from "mui"

export default function Hello(){
  return (
    <Container>
      <Button variant="contained" color="primary">
            你好，世界
        </Button>
      <Card>scrypt enc encrypts infile and
         writes the result to outfile if
       specified, or the standard
       output otherwise.  The user will
       be prompted to enter a
       passphrase (twice) to be used to
       generate a derived encryption
       key.</Card>
    </Container>
  )
}

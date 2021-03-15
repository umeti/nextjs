import fs from 'fs'
import path from 'path'
import Layout from '../../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps() {
  function getTree(child,parent=path.join(process.cwd(),"pages"),base="/"){
    let dir = path.join(parent,child)
    let res = {base:path.join(base,child),files:[]}
    for(let f of fs.readdirSync(dir,{withFileTypes:true})){
      if(/^[\._]|\[/.test(f.name))
        continue

      if(f.isDirectory()){
        res.files.push(getTree(f.name,dir,res.base))
      }else {
        res.files.push(f.name.replace(/\.jsx?$/,""))
      }
    }
    return res
  }
  let tree = getTree("sub")
  console.log(tree)
  return {
    props: {
      tree
    }
  }
}

function TreeBox({tree}){
  return (
    <ul className={utilStyles.list}>
      {tree.files.map((v) => (
        <li className={utilStyles.listItem}>
          {typeof(v) == "string"?(
            v == "index"?(
              <></>
            ):(

              <Link href={path.join(tree.base,v)}>
                <a>{v}</a>
              </Link>)

          ):(
            <>
              <Link href={v.base}>
                <a>{v.base}</a>
              </Link>
              <TreeBox tree={v} />
            </>
          )}

        </li>
      ))}
    </ul>
  )
}


export default function Index({tree}) {
  return (
    <Layout>
      <Head>
        <title>Index of </title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Index of sub pages</h2>
        <TreeBox tree={tree} />
      </section> 

      <audio style={{marginTop:'50px'}} controls src="https://img.vim-cn.com/eb/450a203d02ab3616d078037b5296398a96c96d.oga" />

    </Layout>
  )
}


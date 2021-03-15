import path from 'path'

import Layout from './layout'
export {Layout}
import Head from 'next/head'
export {Head}
import styles from './layout.module.css'
export {styles}
import utilStyles from '../styles/utils.module.css'
export {utilStyles}
import Link from 'next/link'
export {Link}
import {useRouter} from 'next/router'
export {useRouter}

const name = 'Me Ti'
export const siteTitle = 'Next.js Sample Website'

export function Container({ children}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{name}</a>
          </Link>
        </h2>
      </header>
      <main>{children}</main>
      <div className={styles.backToHome}>
        <Link href={path.join(useRouter().pathname,"..")} onClick={useRouter().back}>
          <a>＜ Back</a>
        </Link>
      </div>
    </div>
  )
}

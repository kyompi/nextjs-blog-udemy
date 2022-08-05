import Link from 'next/dist/client/link'
import Head from 'next/head'
import Layout, { SiteTitle } from '../components/Layout'
import { getPostsData } from '../lib/post'
import styles from '../styles/Home.module.css'
import utilStyle from '../styles/utils.module.css'

// SSG の場合
export async function getStaticProps() {
  const allPostsData = getPostsData() //id, title, date, thumbnail
  console.log(allPostsData)

  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{SiteTitle}</title>
      </Head>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <p>私はNextjsエンジニアです</p>
      </section>

      <section>
        <h2>✍エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

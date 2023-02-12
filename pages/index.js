import Head from 'next/head'
import SearchBar from 'components/SearchBar/SearchBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wather App - Next</title>
      </Head>
      <div>
        <div>
          <SearchBar></SearchBar>
        </div>
      </div>
    </div>
  )
}

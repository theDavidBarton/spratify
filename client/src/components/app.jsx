import React, { useEffect, useState, useRef } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Main from './main'
import Footer from './footer'

export default function App() {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const searchState = useRef(null)

  console.log(searchState)

  useEffect(() => {
    ;(async function () {
      try {
        const response = await fetch('/api/liamNeeson')
        const json = await response.json()
        setData(json)
        setDataIsReady(true)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <div className='App'>
      <CookieBar />
      <Header searchRef={searchState} data={data} dataIsReady={dataIsReady} />
      <Main query={searchState} data={data} dataIsReady={dataIsReady} />
      <Footer />
    </div>
  )
}

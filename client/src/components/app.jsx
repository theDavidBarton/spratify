import React, { useEffect, useState } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Main from './main'
import Footer from './footer'

export default function App() {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)

  useEffect(() => {
    ;(async function getLiamNeeson() {
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
      <Header data={data} dataIsReady={dataIsReady} />
      <Main data={data} dataIsReady={dataIsReady} />
      <Footer />
    </div>
  )
}

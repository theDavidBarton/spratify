import React, { useEffect, useState, useRef } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Main from './main'
import Footer from './footer'

export default function App() {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const searchState = useRef('the+monkees')

  console.log(searchState.current)

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
      <Header forwardRef={searchState} data={data} dataIsReady={dataIsReady} />
      <Main forwardRef={searchState} data={data} dataIsReady={dataIsReady} />
      <Footer />
    </div>
  )
}

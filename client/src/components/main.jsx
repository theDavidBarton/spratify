import React, { useEffect, useState, Fragment } from 'react'

export default function Main(props) {
  const [content, setContent] = useState(null)
  const [contentIsReady, setContentIsReady] = useState(false)

  useEffect(() => {
    ;(async function getLiamNeeson() {
      try {
        if (props.dataIsReady) {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=artist%3Ajohn%20lennon&type=album&limit=50&access_token=${props.data}&token_type=Bearer&expires_in=3600`
          )
          const json = await response.json()
          setContent(json)
          setContentIsReady(true)
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [props.data, props.dataIsReady])

  return (
    <Fragment>
      <main className='bg-light'>
        <div className='container'>
          <div className='row'>
            <h1 className='col text-success'>Listening on Spratify</h1>
            <aside className='alert alert-success m-2 w-50'>
              <h2 className='col text-success'>Why sprats?</h2>
              <p className='col'>Content goes here...</p>
            </aside>
          </div>
          <section className='row'>
            <div className='col'>
              <h2>Why sprats?</h2>
              <div className='row'>
                {contentIsReady ? content.albums.items.map(album => <AlbumItem key={album.id} album={album} />) : null}
              </div>
            </div>
          </section>
        </div>
      </main>
    </Fragment>
  )
}

function AlbumItem(props) {
  return (
    <div className='col'>
      <img src={props.album.images[1].url} alt='cover'></img>
      <h3>{props.album.name}</h3>
      <p>{props.album.release_date}</p>
    </div>
  )
}

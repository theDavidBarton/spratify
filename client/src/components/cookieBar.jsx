import React, { useState, Fragment } from 'react'

export default function CookieBar() {
  const [isOpened, setIsOpened] = useState(true)

  const closeIt = () => {
    setIsOpened(false)
  }

  return (
    <Fragment>
      {isOpened ? (
        <div className='bg-success fixed-bottom py-2'>
          <div className='container'>
            <span>Yo, cookies!</span>
            <button onClick={closeIt} type='button' className='float-right btn btn-dark btn-sm' aria-label='Close'>
              <span>OK</span>
            </button>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

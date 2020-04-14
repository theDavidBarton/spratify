import React from 'react'
import logoDark from './../img/logo-big-dark.svg'

export default function Footer() {
  return (
    <footer className='bg-light'>
      <div className='container pb-5'>
        <div className='row justify-content-md-center'>
          <div className='col align-self-center text-left'>
            <img alt='logo' src={logoDark} className='resized-logo' />
            <p className='text-center mt-2'>copyright © 2020 theDavidBarton</p>
          </div>
          <div className='col align-self-end'>
            <p className='lead'>Footer text</p>
            <p>
              <span className='badge badge-success'>#Spratify</span>{' '}
              <span className='badge badge-warning'>#trending</span> <span className='badge badge-light'>#ReactJS</span>{' '}
              <span className='badge badge-danger'>#bootstrap</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

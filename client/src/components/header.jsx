import React from 'react'
import SearchForm from './searchForm'
import logo from './../img/logo-big.svg'
import github from './../img/github.svg'
import linkedin from './../img/linkedin.png'

export default function Header(props) {
  return (
    <header className='bg-dark p-3'>
      <div className='container text-white'>
        <div className='row justify-content-md-center'>
          <div className='col'>
            <a href={'/'}>
              <img className='img-fluid text-center resized-logo' src={logo} alt='logo' />
            </a>
          </div>
          <div className='col-md-auto col-12 align-self-end order-1 order-md-0'>
            <SearchForm data={props.data} dataIsReady={props.dataIsReady} />
            <h1 className='d-none d-md-block'>search for music</h1>
          </div>
          <div className='col-auto align-self-end my-2 d-none d-lg-block'>
            <ul className='list-unstyled align-bottom social-list-margin'>
              <li className='my-2'>
                <a
                  href='https://github.com/theDavidBarton'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-light social-link-style'>
                  <img className='float-left social-img-style' alt='github logo' src={github} />
                  GitHub
                </a>
              </li>
              <li className='my-2'>
                <a
                  href='https://linkedin.com/in/theDavidBarton/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-light float-left social-link-style'>
                  <img className='float-left social-img-style' alt='linkedin logo' src={linkedin} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

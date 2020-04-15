import React, { Fragment } from 'react'

export default function SearchDropdownItem(props) {
  return (
    <Fragment>
      <a key={props.result.id + 'a'} href={`/non-exist/${props.result.id}`} className='text-decoration-none'>
        <li key={props.result.id + 'li'} className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
          {props.result.images[2] ? (
            <img
              className='autocomplete-img-style'
              width='64'
              height='64'
              alt={props.result.name}
              key={props.result.id + 'img'}
              src={props.result.images[2]}
            />
          ) : (
            <svg width='64' height='64'>
              <circle cx='64' cy='64' r='64' fill='#D5D8DC' />
              Sorry, your browser does not support inline SVG.
            </svg>
          )}
          <span key={props.result.id + 'span'} className='mx-1'>
            {props.result.name}({props.result.release_date ? props.result.release_date.match(/[0-9]{4}/) : 'n/a'})
          </span>
        </li>
      </a>
    </Fragment>
  )
}

export function SearchDropdownItemNoResult() {
  return (
    <li className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
      <span className='mx-1'>no results found...</span>
    </li>
  )
}

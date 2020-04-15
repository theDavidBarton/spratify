import React, { Fragment, useEffect, useState } from 'react'
import SearchDropdownItem, { SearchDropdownItemNoResult } from './searchDropdownItem'

export default function Search(props, { searchRef }) {
  const [content, setContent] = useState(null)
  const [contentIsReady, setContentIsReady] = useState(false)
  const [dropdownIsopened, setDropdownIsopened] = useState(false)
  const [keyword, setKeyword] = useState('')

  console.log(content, contentIsReady)

  useEffect(() => {
    searchRef.current = keyword
  }, [searchRef, keyword])

  const autoComplete = async () => {
    try {
      if (keyword !== '') {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${keyword}&type=album&limit=50&access_token=${props.data}&token_type=Bearer&expires_in=3600`
        )
        const json = await response.json()
        setContent(json)
        setContentIsReady(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const setKeywordInInput = async event => {
    await setKeyword(event.target.value)
    autoComplete()
    setDropdownIsopened(true)
  }

  const closeDropdown = () => {
    setDropdownIsopened(false)
    setKeyword('')
  }

  return (
    <Fragment>
      <div className='position-relative' style={{ zIndex: 1 }}>
        <input
          aria-label='lets search for some music now!'
          id='searchform'
          className='form-control mt-2'
          type='text'
          placeholder='Type an artist…'
          value={keyword}
          onChange={setKeywordInInput}
        />
        <label htmlFor='searchform' className='d-none d-md-block input-label-style'>
          let's search for some music now!
        </label>
        {props.dataIsReady ? (
          <Fragment>
            {dropdownIsopened ? (
              <div className='bg-white w-auto text-dark position-absolute dropdown-position py-2 px-2'>
                <ul className='list-unstyled mb-0'>
                  {content.count >= 1 ? (
                    // only first eight search results displayed in the dropdown
                    content.results.slice(0, 8).map(result => <SearchDropdownItem key={result.id} result={result} />)
                  ) : (
                    <SearchDropdownItemNoResult />
                  )}
                </ul>
                <div id='dropdownOverlay' onClick={closeDropdown} className='overlay-style'></div>
              </div>
            ) : null}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  )
}

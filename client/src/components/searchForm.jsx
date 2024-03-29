import React, { Component, Fragment } from 'react'

class SearchForm extends Component {
  state = {
    data: null,
    dataIsReady: false,
    dropdownIsopened: false,
    keyword: ''
  }

  componentDidMount() {
    this.getTmdbApi()
  }

  getTmdbApi = async () => {
    if (this.state.keyword !== '') {
      try {
        const response = await fetch(`/api/${this.props.lang}/movieAutocomplete?q=${this.state.keyword.toLowerCase()}`)
        const json = await response.json()
        this.setState({ data: json, dataIsReady: true })
      } catch (e) {
        console.error(e)
      }
    }
  }

  // _TODO: move to its own component
  getDropdown = () => {
    const dropdown = (
      <Fragment>
        {this.state.data.total_results >= 1 ? (
          this.state.data.results.slice(0, 5).map(result => (
            <a key={result.id + 'a'} href={`/${this.props.lang}/movie/${result.id}`} className='text-decoration-none'>
              <li key={result.id + 'li'} className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
                {result.poster_path ? (
                  <img
                    alt={result.title}
                    key={result.id + 'img'}
                    src={`https://image.tmdb.org/t/p/w45${result.poster_path}`}
                  />
                ) : (
                  <svg width='45' height='68'>
                    <circle cx='45' cy='45' r='45' fill='#D5D8DC' />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                )}
                <span key={result.id + 'span'} className='mx-1'>
                  {result.title} ({result.release_date ? result.release_date.match(/[0-9]{4}/) : 'unknown'})
                </span>
              </li>
            </a>
          ))
        ) : (
          <li className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
            <span className='mx-1'>no results found...</span>
          </li>
        )}
      </Fragment>
    )
    return dropdown
  }

  getDropdownOverlay = () => {
    const overlay = <div id='dropdownOverlay' onClick={this.closeDropdown} className='overlay-style'></div>
    return overlay
  }

  setKeywordInInput = async event => {
    await this.setState({ keyword: event.target.value })
    this.getTmdbApi()
    this.setState({ dropdownIsopened: true })
  }

  closeDropdown = () => {
    this.setState({ dropdownIsopened: false, keyword: '' })
  }

  render() {
    return (
      <Fragment>
        <div className='position-relative' style={{ zIndex: 1 }}>
          <input
            className='form-control mt-2'
            type='text'
            placeholder='type some music...'
            value={this.state.keyword}
            onChange={this.setKeywordInInput}
          />
          {this.state.dataIsReady ? (
            <Fragment>
              {this.state.dropdownIsopened ? (
                <div className='bg-light w-auto text-dark position-absolute py-2 px-2'>
                  <ul className='list-unstyled mb-0'>{this.getDropdown()}</ul>
                  {this.getDropdownOverlay()}
                </div>
              ) : null}
            </Fragment>
          ) : null}
        </div>
      </Fragment>
    )
  }
}
export default SearchForm

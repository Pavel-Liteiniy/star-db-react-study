import React, { Component } from 'react'

import './item-list.css'

import Loader from '../loader'
import ErrorIndicator from '../error-indicator'

import { DataType } from '../../const'

const ListView = ( { items, clickHandler, dataType } ) => {
  const itemElements = items.map( ( { id, name } ) => {
    let label = ``

    switch ( dataType ) {
      case DataType.PEOPLE:
        label = `${name} (person)`
        break
      case DataType.PLANET:
        label = `${name} (planet)`
        break
      case DataType.STARSHIP:
        label = `${name} (starship)`
        break
    }

    return (
      <li key={ id } className="list-group-item">
        <a
          href="#!"
          onClick={ clickHandler( id ) }>
          { label }
        </a>
      </li>
    )
  } )

  return (
    <React.Fragment>
      { itemElements }
    </React.Fragment>
  )
}

export default class ItemList extends Component {
  state = {
    listItems: null,
    loading: true,
    error: false,
  }

  componentDidMount() {
    this._updateItem()
  }

  componentDidUpdate( prevProps ) {
    if ( this.props.dataType === prevProps.dataType ) {
      return
    }

    this._updateItem()
  }


  render() {
    const { listItems, loading, error } = this.state
    const { dataType } = this.props

    const loaderElement = loading ? <Loader /> : null
    const errorElement = error ? <ErrorIndicator /> : null
    const listElement = ( !loading && !error ) ? <ListView items={ listItems } clickHandler={ this._onCharacterClick } dataType={ dataType } /> : null

    if ( !listItems ) {
      return (
        <ul className="item-list list-group">
          { loaderElement }
          { errorElement }
          { listElement }
        </ul>
      )
    }

    return (
      <ul className="item-list list-group">
        { loaderElement }
        { errorElement }
        { listElement }
      </ul>
    )
  }

  _onCharacterClick = ( id ) => {
    return ( evt ) => {
      evt.preventDefault()
      this.props.eventHandler( id )
    }
  }

  _updateItem() {
    const { getData, dataType } = this.props

    if ( dataType === null ) {
      return
    }

    getData.getAllItems( dataType )
      .then( listItems => {
        this.setState( {
          listItems,
          loading: false,
        } )
      } )
      .catch( () => {
        this.setState(
          {
            loading: false,
            error: true,
          }
        )
      } )

    this.setState( {
      loading: true,
    } )
  }
}

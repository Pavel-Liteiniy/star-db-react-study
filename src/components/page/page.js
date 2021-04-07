import React, { Component } from 'react'

import ItemList from '../item-list'
import ItemDetails from '../item-details'
import ErrorBoundary from '../error-boundary'

import './page.css'

const RowView = ( { columnFirst, columnSecond } ) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">
        { columnFirst }
      </div>
      <div className="col-md-6">
        { columnSecond }
      </div>
    </div>
  )
}

export default class Page extends Component {
  state = {
    selectedItem: null,
  }

  componentDidUpdate( prevProps ) {
    if ( this.props.dataType === prevProps.dataType ) {
      return
    }

    this.setState( () => {
      return {
        selectedItem: null
      }
    } )
  }

  render() {
    const { selectedItem } = this.state
    const { dataType, swapiService } = this.props

    return (
      <ErrorBoundary>
        <RowView
          columnFirst={ <ItemList eventHandler={ this._onItemSelected } getData={ swapiService } dataType={ dataType } /> }
          columnSecond={ <ItemDetails itemId={ selectedItem } dataType={ dataType } /> } />
      </ErrorBoundary>
    )
  }

  _onItemSelected = ( id ) => {
    this.setState( () => {
      return {
        selectedItem: id
      }
    } )
  }
}

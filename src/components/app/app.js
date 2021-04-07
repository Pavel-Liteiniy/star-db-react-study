import React, { Component } from 'react'

import { DataType } from '../../const'
import ErrorBoundary from '../error-boundary'

import SwapiService from '../../services/swapi-service'
import { API_BASE } from '../../const'
import { SwapiServiceProvider } from '../swapi-service-context'

import { withSwapiService } from '../hoc-helpers'


import Header from '../header'
import RandomPlanet from '../random-planet'
import Page from '../page'

import './app.css'

export default class App extends Component {
  swapiService = new SwapiService( API_BASE )

  state = {
    dataTypeSelected: DataType.STARSHIP,
  }

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={ this.swapiService }>
          <div>
            <Header
              dataType={ this.state.dataTypeSelected }
              eventHandler={ this._navigationEventHandler } />
            { withSwapiService( ( { swapiService } ) => <RandomPlanet swapiService={ swapiService } /> )() }
            { withSwapiService( ( { swapiService } ) => <Page dataType={ this.state.dataTypeSelected } swapiService={ swapiService } /> )() }
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    )
  }

  _navigationEventHandler = ( dataTypeSelected ) => {
    this.setState( {
      dataTypeSelected,
    } )
  }
}

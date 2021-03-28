import React, { Component } from 'react'

import './random-planet.css'

import { API_BASE } from '../../const'
import { getRandomInteger } from '../../utils/common'

import SwapiService from '../../services/swapi-service'
import Loader from '../loader'
import ErrorIndicator from '../error-indicator'

const PlanetView = ( { planet } ) => {
  const { id, name, population, rotationPeriod, diameter } = planet

  return (
    <React.Fragment>
      <img className="planet-image"
        src={ `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` }
        alt={ `Planet ${name}` } />
      <div>
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{ population }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{ rotationPeriod }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{ diameter }</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default class RandomPlanet extends Component {
  state = {
    planet: {},
    loading: true,
    error: false,
  }

  constructor() {
    super()
    this.updatePlanet()
  }

  swapiService = new SwapiService( API_BASE )

  _onPlanetLoaded = ( planet ) => {
    this.setState(
      {
        planet,
        loading: false
      }
    )
  }

  _onError = () => {
    this.setState(
      {
        loading: false,
        error: true,
      }
    )
  }

  updatePlanet() {
    const id = getRandomInteger( 27, 0 )
    this.swapiService.getPlanet( id )
      .then( this._onPlanetLoaded )
      .catch( this._onError )
  }

  render() {
    const { planet, loading, error } = this.state

    const loaderElement = loading ? <Loader /> : null
    const errorElement = error ? <ErrorIndicator /> : null
    const planetElement = ( !loading && !error ) ? <PlanetView planet={ planet } /> : null

    return (
      <div className="random-planet jumbotron rounded">
        { loaderElement }
        { errorElement }
        { planetElement }
      </div>
    )
  }
}

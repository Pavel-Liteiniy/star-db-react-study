import React, { Component } from 'react'

import './random-planet.css'

import { DataType } from '../../const'
import { getRandomInteger, getNumberFormat } from '../../utils/common'

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
            <span>{ getNumberFormat( population ) }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{ getNumberFormat( rotationPeriod ) }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{ getNumberFormat( diameter ) }</span>
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

  componentDidMount() {
    this.updatePlanet()
    this.interval = setInterval( this.updatePlanet, 5000 )
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

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

  updatePlanet = () => {
    const id = getRandomInteger( 24, 3 )
    this.props.swapiService.getItem( id, DataType.PLANET )
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

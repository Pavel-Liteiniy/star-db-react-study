import React, { Component } from 'react';

import './item-details.css';

import SwapiService from '../../services/swapi-service'
import { API_BASE, DataType } from '../../const'
import { getNumberFormat } from '../../utils/common'

import Loader from '../loader'
import ErrorIndicator from '../error-indicator'

const ImgUrl = {
  [ DataType.PEOPLE ]: `characters`,
  [ DataType.PLANET ]: `planets`,
  [ DataType.STARSHIP ]: `starships`,
}

const getPeopleTemplate = ( { birthYear, eyeColor, gender, name } ) => {
  return (
    <div className="card-body">
      <h4>{ name }</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Gender</span>
          <span>{ gender }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Birth Year</span>
          <span>{ birthYear }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Eye Color</span>
          <span>{ eyeColor }</span>
        </li>
      </ul>
    </div>
  )
}

const getPlanetTemplate = ( { diameter, name, population, rotationPeriod } ) => {
  return (
    <div className="card-body">
      <h4>{ name }</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Population</span>
          <span>{ getNumberFormat( population ) }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Rotation Period</span>
          <span>{ rotationPeriod }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Diameter</span>
          <span>{ getNumberFormat( diameter ) }</span>
        </li>
      </ul>
    </div>
  )
}

const getStarshipTemplate = ( { cargoCapacity, costInCredits, crew, length, manufacturer, model, name, passengers } ) => {
  return (
    <div className="card-body">
      <h4>{ name }</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Cargo Capacity</span>
          <span>{ cargoCapacity }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Cost In Credits</span>
          <span>{ costInCredits }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Crew</span>
          <span>{ crew }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Length</span>
          <span>{ getNumberFormat( length ) }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Manufacturer</span>
          <span>{ manufacturer }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Model</span>
          <span>{ model }</span>
        </li>
        <li className="list-group-item">
          <span className="term">Passengers</span>
          <span>{ getNumberFormat( passengers ) }</span>
        </li>
      </ul>
    </div>
  )
}

const CardView = ( { item, dataType } ) => {
  const { id } = item

  let cardBody = null

  switch ( dataType ) {
    case DataType.PEOPLE:
      cardBody = getPeopleTemplate( item )
      break
    case DataType.PLANET:
      cardBody = getPlanetTemplate( item )
      break
    case DataType.STARSHIP:
      cardBody = getStarshipTemplate( item )
      break
  }

  return (
    <React.Fragment>
      <img className="item-image"
        src={ `https://starwars-visualguide.com/assets/img/${ImgUrl[ dataType ]}/${id}.jpg` }
        alt={ dataType } />
      { cardBody }
    </React.Fragment>
  )
}

export default class ItemDetails extends Component {

  swapiService = new SwapiService( API_BASE )

  state = {
    item: null,
    loading: false,
    error: false,
  }

  componentDidMount() {
    this._updateItem()
  }

  componentDidUpdate( prevProps ) {
    if ( this.props.itemId === prevProps.itemId ) {
      return
    }

    if (this.props.itemId === null && prevProps.itemId !== null) {
      this.setState({
        item: null
      })
    }

    this._updateItem()
  }


  render() {
    const { item, loading, error } = this.state
    const { dataType } = this.props

    if ( item === null ) {
      return (
        <div className="item-details card">
          <span>Select a item from the list</span>
        </div>
      )
    }

    const loaderElement = loading ? <Loader /> : null
    const errorElement = error ? <ErrorIndicator /> : null
    const cardElement = ( !loading && !error ) ? <CardView item={ item } dataType={ dataType } /> : null

    return (
      <div className="item-details card">
        { loaderElement }
        { errorElement }
        { cardElement }
      </div>
    )
  }

  _updateItem() {
    const { itemId, dataType } = this.props

    if ( itemId === null ) {
      return
    }

    this.swapiService.getItem( itemId, dataType )
      .then( ( item ) => {
        this.setState( {
          item,
          loading: false,
        } )
      } )
      .catch( () => {
        this.setState( {
          loading: false,
          error: true,
        } )
      } )

    this.setState( {
      loading: true,
    } )
  }
}

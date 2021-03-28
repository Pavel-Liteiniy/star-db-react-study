const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const ID_REG_EXP = /(planets|starships|people)\/([0-9]+)/

export default class SwapiService {
  constructor( endPoint ) {
    this._endPoint = endPoint;
  }

  async getAllPeople() {
    const response = await this._load( { url: `people` } )
    return response.results.map( this._transformPerson )
  }

  async getPerson( id ) {
    const person = await this._load( { url: `people/${id}` } )
    return this._transformPerson( person )
  }

  async getAllPlanets() {
    const response = await this._load( { url: `planets` } )
    return response.results.map( this._transformPlanet )
  }

  async getPlanet( id ) {
    const planet = await this._load( { url: `planets/${id}` } )
    return this._transformPlanet( planet )
  }

  async getAllStarships() {
    const response = await this._load( { url: `starships` } )
    return response.results.map( this._transformStarship )
  }

  async getStarship( id ) {
    const starship = await this._load( { url: `starships/${id}` } )
    return this._transformStarship( starship )
  }

  _transformPlanet( planet ) {
    const id = planet.url.match( ID_REG_EXP )[ 2 ]

    return {
      id,
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }

  _transformPerson( person ) {
    const id = person.url.match( ID_REG_EXP )[ 2 ]

    return {
      id,
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    }
  }

  _transformStarship( starship ) {
    const id = starship.url.match( ID_REG_EXP )[ 2 ]

    return {
      id,
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    }
  }

  _load( {
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  } ) {
    return this.getResource( `${this._endPoint}/${url}`, { method, body, headers } );
  }

  async getResource( url, { method, body, headers } ) {

    const response = await fetch( url, { method, body, headers } )

    if ( !response.ok ) {
      throw new Error( `Could not fetch ${url}, received status - ${response.status}` )
    }

    const resource = await response.json()

    return resource;
  }
}

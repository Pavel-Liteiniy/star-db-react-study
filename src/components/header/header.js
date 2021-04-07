import React, { Component } from 'react'

import { DataType } from '../../const'

import './header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="header d-flex">
        <h3>
          <a href="#!">
            Star DB
          </a>
        </h3>
        <ul className="d-flex">
          <li>
            <a onClick={this._onNavItemClick(DataType.PEOPLE)} href="#!">People</a>
          </li>
          <li>
            <a onClick={this._onNavItemClick(DataType.PLANET)} href="#!">Planets</a>
          </li>
          <li>
            <a onClick={this._onNavItemClick(DataType.STARSHIP)} href="#!">Starships</a>
          </li>
        </ul>
      </div>
    )
  }

  _onNavItemClick = (dataTypeSelected) => {
    return (evt) => {
      evt.preventDefault()

      const { dataType, eventHandler } = this.props
      
      if (dataTypeSelected === dataType) {
        return
      }

      eventHandler(dataTypeSelected)
    }
  }
}

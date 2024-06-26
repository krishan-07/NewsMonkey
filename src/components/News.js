import React, { Component } from 'react'
import NewItem from './NewItem'

export default class News extends Component {
  render() {
    return (
      <div>
        Im a News Component
        < NewItem />
        < NewItem />
        < NewItem />
        < NewItem />
      </div>
    )
  }
}

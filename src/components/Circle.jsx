import React, { Component } from 'react'
import './Circle.css'

class Circle extends React.Component {
    render() {
        return (
            <i className="fas fa-circle " style={{ color: this.props.circleColor }}></i>
        )
    }
}

export default Circle
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import MainBody from '../components/MainBody'

export default class HomeScreen extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
               <Header/>
               <MainBody/>
            </div>
        )
    }
}


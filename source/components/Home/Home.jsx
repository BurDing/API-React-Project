import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Checkbox, Dropdown, Menu, Form } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Switch, hashHistory} from 'react-router-dom'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import axios from 'axios'

import styles from './Home.scss'

import MovieList from './MovieList.jsx';
import Check from './Check.jsx';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compare: 'rank',
      order: 'descending'
    };
    this.content = [];
    this.baseUrl = 'https://api.themoviedb.org/3/search/movie';
    this.apikey = '?api_key=68863632dde2049fa162227d32742795';
    this.input = this.input.bind(this);
    this.set1 = this.set1.bind(this);
    this.set2 = this.set2.bind(this);
  }

  set1(event) {
    this.setState({
      compare: event
    })
  }

  set2(event) {
    this.setState({
      order: event
    })
  }

  input(event) {
    axios.get(this.baseUrl + this.apikey + '&query=' + event.target.value)
      .then((res) => {
          this.content = res.data.results;
          if (this.state.compare == 'title') {
            if (this.state.order == 'descending') {
              this.content.sort(function(a,b){
                if(a.title < b.title) return 1;
                if(a.title > b.title) return -1;
                return 0;
              });
            } else {
              this.content.sort(function(a,b){
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
              });
            }
          } else {
            if (this.state.order == 'descending') {
              this.content.sort(function(a,b){
                return b.vote_average - a.vote_average;
              });
            } else {
              this.content.sort(function(a,b){
                return a.vote_average - b.vote_average;
              });
            }
          }
          this.setState({
            //lifecycle trigger
          });
      })
      .catch((error) => {
          console.log(error);
      });
  }



  render() {
    return (
      <div>

        <div className = "Home">
          <h1>MovieDB</h1>

          <Input
            className = "input"
            onChange = {this.input}
            label = 'Search Movie'
            placeholder = '#Movie title'
          />

          <h3><Link to="/" className = "hometag">Home</Link></h3>

          <h3><Link to="/Gallery" className = "gallerytag">Gallery</Link></h3>

        </div>

        <div className = "check">
          <Check
            onSet = {(term) => this.set1(term)}
            index = '1' order = {this.state.order}
            compare = {this.state.compare}
            content = {this.content}/>

          <Check
            onSet = {(term) => this.set2(term)}
            index = '2' order = {this.state.order}
            compare = {this.state.compare}
            content = {this.content}/>
        </div>



        <MovieList movielist = {this.content} />

      </div>
    );
  }
}

Home.propTypes = {
  //No propTypes in Home
};

export default Home

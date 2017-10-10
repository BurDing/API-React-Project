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


class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>

        <List className = "list">
          {this.props.movielist
            .map((movie) =>
            <Link to={
              {
                pathname: `/Details_G1/${movie.id}`,
                state:{
                  id: `${movie.id}`,
                  content: this.props.movielist
                }
              }
            }>
              <List.Item key = {movie.id} className = "item">
                <Image className = "image" src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                <List.Content className = "text">
                  <List.Header className = "texttitle" >{movie.title}</List.Header>
                  <List.Description>{movie.vote_average}</List.Description>
                  <List.Description>{movie.release_date}</List.Description>
                </List.Content>
              </List.Item>
            </Link>
          )}
        </List>

      </div>
    );
  }

}

MovieList.propTypes = {
  movielist: PropTypes.array
};

export default MovieList

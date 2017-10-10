import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Checkbox, Dropdown, Menu, Form } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import axios from 'axios'

import styles from './Gallery.scss'

class Gallery_Cate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '10'
    };
    this.content = [];
    this.filter = this.filter.bind(this);
  }

  filter() {
    this.content= [];
    for (let i = 1; i < this.state.page; i++) {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=68863632dde2049fa162227d32742795&language=en-US&page=${i}`)
        .then((res) => {
          for (let j = 0; j < 20; j++) {
            for (let k = 0; k < res.data.results[j].genre_ids.length; k++) {
              if (res.data.results[j].genre_ids[k] == this.props.cate) {
                this.content = this.content.concat(res.data.results[j]);
              }
            }
          }
          this.props.reset(this.content);
          this.setState({
            //lifecycle trigger
          });
        })
        .catch((error) => {
            console.log(error);
        });
    }

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>

          <Button onClick = {this.filter}>
            {this.props.name}
          </Button>

      </div>
    );
  }
}

Gallery_Cate.propTypes = {
  reset: PropTypes.func,
  cate: PropTypes.string,
  name: PropTypes.string
};

export default Gallery_Cate

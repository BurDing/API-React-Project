import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Checkbox, Dropdown, Menu, Form } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import axios from 'axios'

import styles from './Gallery.scss'

import Gallery_Cate from './Gallery_Cate.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        page: '10'
    };
    this.content = [];
    this.cate = 0;
    this.all = this.all.bind(this);
    this.reset = this.reset.bind(this);
  }

  all() {
    this.cate = 0;
    this.content= [];
    for (let i = 1; i < this.state.page; i++) {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=68863632dde2049fa162227d32742795&language=en-US&page=${i}`)
        .then((res) => {
          this.content = this.content.concat(res.data.results)
          this.setState({
            //lifecycle trigger
          });
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }

  reset(event) {
    this.content = event;
    this.setState({
      //lifecycle trigger
    });
  }

  componentDidMount() {
    for (let i = 1; i < this.state.page; i++) {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=68863632dde2049fa162227d32742795&language=en-US&page=${i}`)
        .then((res) => {
          this.content = this.content.concat(res.data.results);
          this.setState({
            //lifecycle trigger
          });
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>

        <div className = "galltitle">

          <h1>MovieDB</h1>

          <h3><Link to="/" className = "hometag">Home</Link></h3>

          <h3><Link to="/Gallery" className = "gallerytag">Gallery</Link></h3>

        </div>

        <div className = "back">

        </div>

        <div className = "gallcate">

          <Button onClick = {this.all}>
            All
          </Button>

          <Gallery_Cate cate = "28" name = "Action" reset = {(term) => this.reset(term)}/>

          <Gallery_Cate cate = "16" name = "Animation" reset = {(term) => this.reset(term)}/>

          <Gallery_Cate cate = "35" name = "Comedy" reset = {(term) => this.reset(term)}/>

          <Gallery_Cate cate = "14" name = "Fantasy" reset = {(term) => this.reset(term)}/>

          <Gallery_Cate cate = "80" name = "Crime" reset = {(term) => this.reset(term)}/>

          <Gallery_Cate cate = "53" name = "Thriller" reset = {(term) => this.reset(term)}/>

          <Gallery_Cate cate = "10749" name = "Romance" reset = {(term) => this.reset(term)}/>

          <Gallery_Cate cate = "10752" name = "War" reset = {(term) => this.reset(term)}/>

        </div>

        <div className = "gall">
          {this.content
            .map((post) =>
            <Link to={
              {
                pathname: `/Details_G1/${post.id}`,
                state:{
                  id: `${post.id}`,
                  content: this.content
                }
              }
            }>
              <Image key = {post.id} className = "gallimage" src={`http://image.tmdb.org/t/p/w500/${post.poster_path}`}/>
            </Link>
            )}
        </div>

      </div>
    );
  }
}

export default Gallery

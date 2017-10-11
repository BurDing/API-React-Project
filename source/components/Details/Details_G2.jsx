import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Card, Icon, Image, Checkbox, Dropdown, Menu, Form } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Switch, Link, hashHistory} from 'react-router-dom'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import axios from 'axios'

import styles from './Details.scss'

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.content = [];
    this.group = [];
    this.index = 0;
    this.nx = 0;
    this.nid = 0;
    this.px = 0;
    this.pid = 0;
  }

  componentWillMount() {
    axios.get(`https://api.themoviedb.org/3/movie/${this.props.location.state.id}?api_key=68863632dde2049fa162227d32742795`)
      .then((res) => {
          this.content = res.data;
          this.setState({
            //
          });
      })
      .catch((error) => {
          console.log(error);
      });
      this.group = this.props.location.state.content;
      for (let j = 0; j < this.group.length; j++) {
        if (this.group[j].id == this.props.location.state.id) {
          this.index = j;
          this.nx = j + 1;
          this.px = j - 1;
          if (this.nx >= this.group.length) {
            this.nx = 0;
          }
          if (this.px < 0) {
            this.px = this.group.length - 1;
          }
        }
      }
      this.nid = this.group[this.nx].id;
      this.pid = this.group[this.px].id;
  }

  render() {
    return (
      <div>
        <div className = "detitle">
          <h2><Link to="/">Home&nbsp;&nbsp;&nbsp;</Link><Link to="/Gallery">&nbsp;&nbsp;&nbsp;Gallery</Link></h2>
        </div>

        <Link to={
          {
            pathname: `/Details_G1/${this.nid}`,
            state:{
              id: `${this.nid}`,
              content: this.group
            }
          }
        }>
          <Button className = "next" onClick = {this.next}>
              Next
          </Button>
        </Link>

        <Link to={
          {
            pathname: `/Details_G1/${this.pid}`,
            state:{
              id: `${this.pid}`,
              content: this.group
            }
          }
        }>
          <Button className = "previous">
              Previous
          </Button>
        </Link>

        <Card className = "decard">
          <Image className = "deimage" src={`http://image.tmdb.org/t/p/w500/${this.content.poster_path}`} size='large'centered />
          <Card.Content>
            <Card.Header>
              {this.content.title}
            </Card.Header>
            <Card.Meta>
              <span>
                Rate: {this.content.vote_average}
              </span>
              <br/>
              <span>
                Released at: {this.content.release_date}
              </span>
            </Card.Meta>
            <Card.Description>
              {this.content.overview}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Details.propTypes = {
  location: PropTypes.object
};

export default Details

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


class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.first = '';
    this.second = '';
    this.name = '';
    this.tag = '';
    this.first_f = this.checkrank;
    this.second_f = this.checkytitle;
    this.checkrank = this.checkrank.bind(this);
    this.checktitle = this.checktitle.bind(this);
    this.ascending = this.ascending.bind(this);
    this.descending = this.descending.bind(this);
  }

  checkrank() {
    this.props.onSet("rank");
    if (this.props.order == 'descending') {
      this.props.content.sort(function(a,b){
        return b.vote_average - a.vote_average;
      });
    } else {
      this.props.content.sort(function(a,b){
        return a.vote_average - b.vote_average;
      });
    }
  }

  checktitle() {
    this.props.onSet("title");
    if (this.props.order == 'descending') {
      this.props.content.sort(function(a,b){
        if(a.title < b.title) return 1;
        if(a.title > b.title) return -1;
        return 0;
      });
    } else {
      this.props.content.sort(function(a,b){
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
      });
    }
  }

  descending() {
    this.props.onSet("descending");
    if (this.props.compare == 'title') {
      this.props.content.sort(function(a,b){
        if(a.title < b.title) return 1;
        if(a.title > b.title) return -1;
        return 0;
      });
    } else {
      this.props.content.sort(function(a,b){
        return b.vote_average - a.vote_average;
      });
    }
  }

  ascending() {
    this.props.onSet("ascending");
    if (this.props.compare == 'title') {
      this.props.content.sort(function(a,b){
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
      });
    } else {
      this.props.content.sort(function(a,b){
        return a.vote_average - b.vote_average;
      });
    }
  }

  render() {
    if (this.props.index == 1) {
      this.first = 'rank';
      this.second = 'title';
      this.first_f = this.checkrank;
      this.second_f = this.checktitle;
      this.name = this.props.compare;
      this.tag = 'Filter';
    } else {
      this.first = 'descending';
      this.second = 'ascending';
      this.name = this.props.order;
      this.first_f = this.descending;
      this.second_f = this.ascending;
      this.tag = 'Order';
    }
    return (
      <div>

        <h2>{this.tag}</h2>

        <Form className = "form">
          <Form.Field className = "field" >
            <Checkbox
              radio
              label={this.first}
              name='checkboxRadioGroup'
              value={this.first}
              checked={this.name === this.first}
              onChange={this.first_f}
            />
          </Form.Field>
          <Form.Field className = "field">
            <Checkbox
              radio
              label={this.second}
              name='checkboxRadioGroup'
              value={this.second}
              checked={this.name === this.second}
              onChange={this.second_f}
            />
          </Form.Field>
        </Form>

      </div>
    );
  }

}

Check.propTypes = {
  onSet: PropTypes.func,
  index: PropTypes.string,
  order: PropTypes.string,
  compare: PropTypes.string,
  content: PropTypes.array
};

export default Check

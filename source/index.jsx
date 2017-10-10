import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Details_G1 from './components/Details/Details_G1.jsx';
import Details_G2 from './components/Details/Details_G2.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');



render(
    <Router>
      <div>
       <hr/>

       <Route exact path="/" component={Home}/>
       <Route path="/Gallery" component={Gallery}/>
       <Route path="/Details_G1/:id" component={Details_G1}/>
       <Route path="/Details_G2/:id" component={Details_G2}/>

      </div>
    </Router>,
    document.getElementById('app')
);

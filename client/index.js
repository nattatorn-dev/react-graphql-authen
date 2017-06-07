import React from 'react';

import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {Router,hashHistory,Route,IndexRoute} from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/requireAuth';

import SongCreate from './components/SongCreate';
import SongDetails from './components/SongDetails';
import SongList from './components/SongList';
import About from './components/About';
import GeneralSongList from './components/GeneralSongList';
import GeneralSongDetails from './components/GeneralSongDetails';
// network interface, send cookies to make query to the server
const networkInterface = createNetworkInterface({
  uri:'./graphql',
  opts:{
    credentials:'same-origin'
  }
});

//interact with server
const client = new ApolloClient({
    networkInterface,
    dataIdFromObject: o => o.id
});



const Root = () => {
  return (
  <ApolloProvider client = {client} >
    <Router history = {hashHistory}>
      <Route path="/" component = {App}>
        <Route path = "login" component = {LoginForm} />
        <Route path = "signup" component = {SignupForm} />
        <Route path = "dashboard" component = {RequireAuth(Dashboard)} />
        <Route path ="about" component ={About} />
        <IndexRoute component ={GeneralSongList} />
        <Route path ="songs/new" component ={SongCreate} />
        <Route path ="songs/:id" component ={SongDetails}/>

      </Route>
    </Router>
  </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));

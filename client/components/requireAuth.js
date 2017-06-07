import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../query/CurrentUser';
import {hashHistory} from 'react-router';
import SongList from './SongList';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps){
      //console.log(this.props.data.loading,this.props.data.user);
      if (!nextProps.data.loading&&!nextProps.data.user){
          hashHistory.push('/login');
      }
    }

    render(){
      return (
        <div className = "container">
        <WrappedComponent {...this.props} />
        <SongList />
      </div>
      );
    }
  }
  return graphql(currentUserQuery)(RequireAuth);
};

import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';
import query from '../query/fetchSongs';

class SongList extends Component{

  renderSongs(){

    return this.props.data.songs.map(({id,title})=>{
      return(

        <li key ={id} className = "collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
        </li>
  );
});
}

  render(){
    if(this.props.data.loading){return <div>Loading just wait.. </div>; }

    return(
      <div>
      <ul className ="collection">
        {this.renderSongs()}
      </ul>
      </div>

  );
  }
}

export default graphql(query)(SongList);

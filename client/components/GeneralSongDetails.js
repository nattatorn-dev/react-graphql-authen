import React ,{Component} from 'react';
import { graphql } from 'react-apollo';
import fetchSepecificSong from '../query/fetchSpecificSong';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetails extends Component{
  render(){

    const {song} =this.props.data;
    if(!song){return <div>Loading</div>;}
    return(
      <div>
      <Link to="/">back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics = {song.lyrics} />
      </div>
    );
  }
}
// graphql 101. could be reuse and copy and paste
export default graphql(fetchSepecificSong,{
  options:(props)=>{ return { variables:{ id :props.params.id }}}
})(SongDetails);

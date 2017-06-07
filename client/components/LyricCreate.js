import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
//import query from '../queries/fetchSpecificSong';
//import {hashHistory} from 'react-router';

class LyricCreate extends Component{
  constructor(props){
    super(props);
    this.state ={ content :''};

  }
  onSubmit(event){
    event.preventDefault();
    this.props.mutate({variables:{
      content:this.state.content,
      songId:this.props.songId,
    }}).then(() => this.setState({content:''}));


  }
  render(){
      return(

      <form onSubmit = {this.onSubmit.bind(this)}>
        <p>{ this.state.content}</p>
      <label>Add Another Chapter</label>
         <input value = { this.state.content} onChange ={event => this.setState({ content:event.target.value})} />
     </form>
   );
  }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID) {
  addLyricToSong(content: $content, songId: $songId) {
    id
    lyrics {
      id
      content
      likes
    }
  }
}
`;

export default graphql(mutation)(LyricCreate);

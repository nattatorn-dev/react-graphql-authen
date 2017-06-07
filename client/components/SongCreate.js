import React ,{Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { Link , hashHistory} from 'react-router';
import query from '../query/fetchSongs';

class SongCreate extends Component{
  constructor(props){
    super(props);
    this.state = {title:''};

  }

  onSubmit(event){
    event.preventDefault();
    // get title variable from the states
  this.props.mutate({
    variables:{title:this.state.title},
    refetchQueries:[{query:query}]
  }).then(() => hashHistory.push('/dashboard'));// after state has change, push to the index page
  }
  render(){
    return (
      <div>
      <Link to="dashboard">
      Back to list
      </Link>
      <h3>增添新小说</h3>
        <form onSubmit = {this.onSubmit.bind(this)}>
          <label>小说题目 :</label>
          <input onChange = {event => this.setState ({title:event.target.value})}
          value = {this.state.title}
          />
        </form>
      </div>
    );
  }
}
// create song query
const mutation = gql`
  mutation AddSong($title:String){
  addSong(title:$title){
    title
  }
}
`;
// combine the query and SongCreate
export default graphql(mutation)(SongCreate);

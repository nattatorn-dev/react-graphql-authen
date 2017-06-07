import React, {Component}  from 'react';
import gql from 'graphql-tag';
import  {graphql} from 'react-apollo';
import { Link } from 'react-router';
import '../style/style.css';
import fetchSepecificSong from '../query/fetchSpecificSong';

class LyricList extends Component{

 // onLike(id,likes){
 //    this.props.mutate({
 //      variables:{id},
 //      optimisticResponse:{
 //        __typename:'Mutation',
 //        likeLyric:{id:id,__typename:'LyricType',likes:likes + 1}
 //      }
 //
 //    });
 //  }
  //
  onLyricDelete(id){
  //   // delete song and refresh the queries
  this.props.mutate({variables:{id}}).then(()=>this.props.data.refetch());
  }

  renderLyrics(){

    return this.props.lyrics.map(({id,content,likes})=>{``
      return (
        <li key= {id} className ="collection-item">

          {content}
          <div className = "vote-box">
   {/* <i className ="material-icons" onClick={()=>this.onLike(id,likes)}>thumb_up</i>

          {likes} */}
            <i className="material-icons" onClick={()=>this.onLyricDelete(id)}>delete</i>
        </div>
        </li>
      );
    });
  }
  render(){
  //  if(this.props.data.loading){return <div> Loading just wait.. </div>; }
    return (
      <ul className = "collection">
        {this.renderLyrics()}

      </ul>
    );
  }
}

// const mutation  = gql `
// mutation likeLyric($id:ID){
//   likeLyric(id:$id){
//     id
//     likes
//   }
// }
//
// `;


const mutation  = gql `
mutation deleteLyric($id: ID) {
  deleteLyric(id: $id) {
    id
  }
}
`;
//refetch the epecific Song lyrics but also need to pass the songid
export default graphql(fetchSepecificSong,{
  options:(props)=>{ return { variables:{ id :props.songId}}}
})(
 graphql(mutation)(LyricList)
 );

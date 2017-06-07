import React, {Component} from 'react';
import  {graphql} from 'react-apollo';
import query from '../query/CurrentUser';
import  { Link } from 'react-router';
import  mutation from '../mutations/logout';
class Header extends Component{
  onLogoutClick(){
//do mutation and refrech the component
    this.props.mutate({
      refetchQueries:[{query}]
    });
  }
  renderButtons(){

    const { loading,user } = this.props.data;
    if(loading){ return <div />;}
    if(user){
      return (
        <li><a onClick = {this.onLogoutClick.bind(this)}>Logout</a></li>
      );
    } else {
      return (
        <div>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to= "/login">login</Link></li>
        </div>
      );
    }
  }
  render(){
  
    return(
      <nav>
        <div className = "nav-wrapper">
          <ul className = "left">
            <li><Link to ="/" >Home</Link></li>
            <li><Link to="/about">About us </Link> </li>
          </ul>
          <ul className = "right">
          {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql (mutation)(
graphql(query)(Header)
);

import React, { Component} from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/login';
import {graphql} from 'react-apollo';
import query from '../query/CurrentUser';
import {hashHistory} from 'react-router';

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {errors:[]};
  }

  componentWillUpdate(nextProps){
  // this.props //the current set of props
    //nextProps //the next set of props
    if(!this.props.data.user && nextProps.data.user){
      //redirect to dashboard
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email,password}){
    this.props.mutate({
      variables:{ email,password},
      refetchQueries:[{query}]// refresh the header
    }).catch(res => {
      const errors = res.graphQLErrors.map(error =>error.message);
      this.setState({errors});
    });
  }
  render(){
    return (
      <div>
        <h3>Login</h3>
        <AuthForm errors = {this.state.errors} onSubmit = {this.onSubmit.bind(this)}/>
      </div>
    );
  }
}

export default graphql(query)(
  graphql (mutation)(LoginForm)
);

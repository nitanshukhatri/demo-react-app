import React from 'react';
import Axios from 'axios';

class Form extends React.Component {
  state ={username:''}
  handleSubmit = (event) =>{
    event.preventDefault();
    Axios.get(`https://api.github.com/users/${this.state.username}`).then((res)=>{
      console.log(res);
      this.props.onSubmit(res.data);
      this.setState({username:''});
    })
  }

  render() {
    return (
       <form onSubmit={this.handleSubmit}>
         <input type="text" placeholder="github username"
         value={this.state.username}
         onChange={(event)=> this.setState({username:event.target.value})}
         />
         <button type="submit">Add Card</button>
       </form>
    );
  }

}

export default Form;

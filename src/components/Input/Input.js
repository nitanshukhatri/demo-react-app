import React from 'react';

// class Input extends React.Component {
//   render() {
//     return (
//       <div className="form-group">
//         Input
//       </div>
//     );
//   }
// }

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} className="form-control"></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>

  )
}

export default Input;

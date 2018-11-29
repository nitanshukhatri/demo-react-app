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

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input value={value} onChange={onChange} id={name} name={name} type="text" className="form-control"></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>

  )
}

export default Input;

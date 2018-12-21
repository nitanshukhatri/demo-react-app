import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class UiModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // componentDidMount() {
  //   let makeDiv = document.createElement('div');
  //   const modalRoot = document.getElementById('modal-root');
  //   modalRoot.appendChild(this.el);
  // }

  // componentWillUnmount() {
  //   const modalRoot = document.getElementById('modal-root');
  //   modalRoot.removeChild(this.el);
  // }

  // render() {
  //   return ReactDOM.createPortal(
  //     this.props.children,
  //     this.el,
  //   );
  // }
  openSnackbar = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default UiModal;

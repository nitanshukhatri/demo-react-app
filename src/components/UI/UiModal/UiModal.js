import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Portal from '../Portal';



const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  padding: 15px;
  min-width: 320px;
  z-index: 10;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 100px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  padding: 10px;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;

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
    // this.setState({ open: true });
  };

  static handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    // add this modal instance to the modal service so it's accessible from other components
    // UiModal.modal.push(this);
  }

  // render() {
  //   return ReactDOM.createPortal(
  //     this.props.children,
  //     this.el,
  //   );
  // }

  render() {
    const { children } = this.props;
    return (
      <Portal>
        {this.state.on && (
          <ModalWrapper>
            <ModalCard>
              <CloseButton onClick={this.handleClose}>
                <i class="fa fa-times" aria-hidden="true"></i>
              </CloseButton>
              <div>{children}</div>
            </ModalCard>
            <Background onClick={this.handleClose} />
          </ModalWrapper>
        )}
      </Portal>
    );

    // return (
    //   <Dialog
    //     open={this.state.open}
    //     onClose={this.handleClose}
    //     aria-labelledby="form-dialog-title"
    //   >
    //     <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
    //     <DialogContent>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={this.handleClose} color="primary">
    //         Cancel
    //         </Button>
    //       <Button onClick={this.handleClose} color="primary">
    //         Subscribe
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // )
  }
}

export default UiModal;

import React from 'react';
import {
  setOpenHandler,
  newModalUIID,
  renderModal,
  renderMessage,
  setMessageRenderer,
  Container,
  Modal,
} from 'pangea-sdk';

class DemoModal extends Modal {
  render() {
    return (
      <text>Hi there</text>
    );
  }
}

function DemoMessage(props) {
  return (
    <text>I am a message </text>
  );
}

console.log('[DAPP] DApp started');

setOpenHandler((payload, cb) => {

  console.log('[DAPP] DApp opened');

  // obtain a new modal id
  newModalUIID(() => {
    console.log('[DAPP] Closed modal');
  }, (error, modalUIID) => {

    if (error) {
      return cb(error);
    }

    renderModal(<DemoModal modalContainer={new Container(modalUIID)}/>, () => {
      // once the modal got rendered, we can "close" the open process
      cb();
    });

  });

});

/**
 * @desc set out message handler
 */
setMessageRenderer((payload, cb) => {

  const { message } = payload;

  renderMessage(<DemoMessage/>, (jsx) => {
    cb(null, jsx);
  });

});

import React from 'react';
import {
  setOpenHandler,
  newModalUIID,
  renderModal,
  renderMessage,
  setMessageRenderer,
  Container,
} from 'pangea-sdk';
import Modal from './components/Modal';

function DemoMessage(props) {
  return (
    <text>I am a message </text>
  );
}

console.log('[HEY] App started');

setOpenHandler((payload, cb) => {

  console.log('[HEY] App opened');
  // obtain a new modal id
  newModalUIID(() => {
    console.log('[HEY] Closed modal');
  }, (error, modalUIID) => {

    if (error) {
      return cb(error);
    }

    renderModal(<Modal modalContainer={new Container(modalUIID)}/>, () => {
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

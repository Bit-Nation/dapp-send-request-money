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

console.log('[DApp] App started');

setOpenHandler((payload, cb) => {
  // obtain a new modal id
  newModalUIID(() => {
  }, (error, modalUIID) => {
    if (error) {
      return cb(error);
    }
    renderModal(<Modal title='Send/request money' modalContainer={new Container(modalUIID)}/>, cb);
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

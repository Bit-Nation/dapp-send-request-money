import React from 'react';
import {
  setOpenHandler,
  newModalUIID,
  renderModal,
  renderMessage,
  sendMessage,
  setMessageRenderer,
  Container,
} from 'pangea-sdk';
import Modal from './components/Modal';

function DemoMessage(props) {
  return (
    <text>{props.context.account.ethereumAddress}</text>
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
    // renderModal(<Modal title='Send/request money' modalContainer={new Container(modalUIID)}/>, cb);
    sendMessage(payload.partner.identityKey, {
      shouldSend: true,
      params: { myParam: 'MY_PARAM', ...payload },
      type: 'SEND_MONEY'
    }, cb)
  });

});

/**
 * @desc set out message handler
 */
setMessageRenderer((payload, cb) => {
  console.log(`[DAPP] Message payload ${JSON.stringify(payload)}`);

  const { message } = payload;
  renderMessage(<DemoMessage/>, (jsx) => {
    cb(null, jsx);
  });

});

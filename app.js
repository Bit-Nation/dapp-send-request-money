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
import Modal from './src/components/Modal';
import SendMessage from './src/components/SendMessage';
import RequestMessage from './src/components/RequestMessage';

function showMainModal(payload, cb) {
  // obtain a new modal id
  newModalUIID(
    () => {
    },
    (error, modalUIID) => {
      if (error) {
        return cb(error);
      }
      renderModal(<Modal title='Send/request money'
                         context={payload.context}
                         initialData={payload.initialData}
                         modalContainer={new Container(modalUIID)}/>, cb);
    },
  );
}

/**
 * @desc Function that is called on DApp start
 */
setOpenHandler((payload, cb) => {
  showMainModal(payload, cb);
});

/**
 * @desc Function that is called to render message
 */
setMessageRenderer((payload, cb) => {
  const { message, context } = payload;

  let Component = null;
  switch (message.type) {
    case 'SEND_MONEY':
      Component = SendMessage;
      break;
    case 'REQUEST_MONEY':
      Component = RequestMessage;
      break;
  }
  if (Component === null) {
    cb(null, {});
  }

  renderMessage(
    <Component
      payload={payload}
      onSelectSend={(payload, cb) => {
        showMainModal({
          ...payload,
          initialData: {
            amount: message.params.amount,
            currency: message.params.currency,
          },
        }, cb);
      }}/>,
    (jsx) => {
      cb(null, jsx);
    });

});

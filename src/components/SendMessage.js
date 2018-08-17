import React from 'react';

export default function SendMessage({ payload: { message, context } }) {
  const { receiver, sender, amount, currency, txHash } = message.params;

  if (sender.identityKey === context.account.identityKey) {
    return (
      <text type='body'>
        You have paid <text type='bodyBold'> {amount} {currency} </text> to {receiver.name}.
        Transfer may take several minutes.
        {'\n'}
        Tx hash: {txHash}
      </text>
    );
  }

  return (
    <text type='body'>
      You have been paid <text type='bodyBold'> {amount} {currency} </text> from {sender.name}.
      Transfer may take several minutes.
      {'\n'}
      Tx hash: {txHash}
    </text>
  );
}

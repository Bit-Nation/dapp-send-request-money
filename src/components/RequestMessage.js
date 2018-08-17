import React from 'react';

export default function RequestMessage({ payload: { message, context }, onSelectSend }) {
  const { requester, payer, amount, currency } = message.params;

  if (requester.identityKey === context.account.identityKey) {
    return (
      <text type='body'>
        You have requested <text type='bodyBold'> {amount} {currency} </text> from {payer.name}
      </text>
    );
  }

  return (
    <view>
      <text type='body'>
        {requester.name} has requested <text type='bodyBold'>{amount} {currency}</text> from you.
      </text>
      <button type='action'
              onPress={onSelectSend}
              title='SEND'
              style={{ marginTop: 6, marginBottom: 6 }}/>
    </view>
  );
}

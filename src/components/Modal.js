import React from 'react';
import { Modal, sendETHTransaction, sendMessage } from 'pangea-sdk';

export default class CustomModal extends Modal {
  constructor(props) {
    super(props);

    this.state = {
      amount: '0',
      currency: 'ETH',
      walletAddress: '',
      isValid: false,
      isLessThanBalance: false,
      txError: null,
    };

  }

  onAmountSelected = (data, cb) => {
    const { amount, currency, walletAddress, isValid, isLessThanBalance } = data.payload;
    this.setState({
      amount, currency, walletAddress, isValid, isLessThanBalance,
    }, cb);
  };

  onRequestPressed = (data, cb) => {
    sendMessage(this.props.context.partner.identityKey, {
      shouldSend: true,
      params: {
        requester: this.props.context.account,
        payer: this.props.context.partner,
        amount: this.state.amount,
        currency: this.state.currency,
        status: 'pending',
      },
      type: 'REQUEST_MONEY',
    }, cb);
  };

  onSendPressed = (data, cb) => {
    const address = this.props.context.partner.ethereumAddress;
    this.setState(() => ({
      txError: null,
    }), () => {
      sendETHTransaction({
        value: this.state.amount,
        to: address,
        data: '',
      }, (error, tx) => {
        if (error != null) {
          if (error === 'got nil ethTx response') {
            cb();
            return;
          }
          this.setState(() => ({
            txError: error,
          }), cb);
          return;
        }

        const txHash = JSON.parse(tx).hash;

        sendMessage(this.props.context.partner.identityKey, {
          shouldSend: true,
          params: {
            sender: this.props.context.account,
            receiver: this.props.context.partner,
            amount: this.state.amount,
            currency: this.state.currency,
            txHash: txHash,
            contentToCopy: txHash,
          },
          type: 'SEND_MONEY',
        }, cb);
      });
    });
  };

  render() {
    return (
      <view style={{ flex: 1 }}>
        <amountSelect
          onAmountSelected={this.onAmountSelected}
          changeCurrencyEnabled={false}
          initialAmount={(this.props.initialData || {}).amount}
          initialCurrency={(this.props.initialData || {}).currency}/>
        <text style={styles.toLabelText} type='footnote'>Partner name</text>
        <view style={styles.partnerNameContainer}>
          <text type='title2' style={styles.partnerNameText}>{this.props.context.partner.name}</text>
        </view>
        <view style={styles.buttonContainer}>
          <button
            title='REQUEST'
            style={[styles.button, { marginRight: 5 }]}
            type='action'
            disabled={this.state.isValid === false}
            onPress={this.onRequestPressed}
          />
          <button
            title='SEND'
            style={[styles.button, { marginLeft: 5 }]}
            type='action'
            disabled={this.state.isValid === false || this.state.isLessThanBalance === false}
            onPress={this.onSendPressed}
          />
        </view>
        <text type='body' style={styles.errorText}>{this.state.txError}</text>
      </view>
    );
  }
}

const styles = {
  partnerNameContainer: {
    marginTop: 6,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 25,
    height: 50,
  },
  partnerNameText: {
    color: 'black',
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: 'row',
    height: 50,
  },
  button: {
    flex: 1,
  },
  toLabelText: {
    marginLeft: 5,
    marginTop: 10,
  },
  errorText: {
    color: '#FF5469',
  },
};
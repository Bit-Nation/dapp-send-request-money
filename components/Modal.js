import React from 'react';
import { Modal } from 'pangea-sdk';

export default class CustomModal extends Modal {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      currency: 'XPAT',
      walletAddress: '',
      isValid: false,
      isLessThanBalance: false,
    };

  }

  onAmountSelected = (data, cb) => {
    const { amount, currency, walletAddress, isValid, isLessThanBalance } = data.payload;
    this.setState({
      amount, currency, walletAddress, isValid, isLessThanBalance,
    }, cb);
  };

  onRequestPressed = (data, cb) => {
    cb();
  };

  onSendPressed = (data, cb) => {
    cb();
  };

  render() {
    return (
      <view style={{ flex: 1 }}>
        <amountSelect onAmountSelected={this.onAmountSelected}/>
        <text style={styles.toLabelText} type='footnote'>Partner name</text>
        <view style={styles.partnerNameContainer}>
          <text type='title2' style={styles.partnerNameText}>Someone</text>
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
};
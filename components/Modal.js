import React from 'react';
import { Modal } from 'pangea-sdk';

const GlobalStyles = {};
const Colors = {};

export default class CustomModal extends Modal {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      currency: 'XPAT',
      fromAddress: '',
      isValid: false,
    };

  }

  onAmountSelected = (amount, currency, fromAddress, isValid) => {
    this.setState({
      amount, currency, fromAddress, isValid,
    });
  };

  onButtonPress = (context, cb) => {
    console.log(`[HEY] We ${this.props.modalContainer}`);
    console.log(`[HEY] We ${this.props.modalContainer.uiID}`);

    this.setState((prevState) => ({
      isValid: true,
    }), () => {
      console.log('[HEY] Set state callback ');
      cb();
    });

    console.log('[HEY] We are done ');
    // try {
    //   this.props.components.setLoadingVisible(true);
    //   const address = await this.props.services.ethereumService.ethereumAddressFromPublicKey(this.props.context.friend.ethereum_pub_Key);
    //   const result = await this.props.services.sendMoney(this.state.currency, address, this.state.amount);
    //
    //   const data = {
    //     amount: this.state.amount,
    //     currency: this.state.currency,
    //     fromAddress: this.state.fromAddress,
    //     toAddress: address,
    //     txHash: result.hash,
    //     to: this.props.context.friend,
    //     fromName: this.props.context.currentAccount.name,
    //   };
    //
    //   this.props.services.sendMessage('SEND_MESSAGE', '', data, () => {
    //     this.props.navigation.dismiss();
    //   });
    // } catch (error) {
    //   if (error.isCancelled === true) {
    //     return;
    //   }
    //   errorAlert(error);
    // } finally {
    //   this.props.components.setLoadingVisible(false);
    // }
  };

  render() {
    return (
      <view style={{ flex: 1 }}>
        {/*<text>*/}
        {/*{JSON.stringify(this.props)}*/}
        {/*</text>*/}
        {/*<amountSelect onAmountSelected={this.onAmountSelected} shouldCheckLess={true}>*/}
        {/*</amountSelect>*/}
        <text style={styles.toLabelText} type='footnote'>To</text>
        <view style={styles.textInputContainer}>
          <textInput
            style={[styles.textInputInContainer, GlobalStyles.currencyLarge, styles.currencyNumber]}
            editable={false}
            // value={this.props.context.friend.name}
          />
        </view>
        <button
          title='Change'
          onPress={this.onButtonPress}
        />
        <button
          title='Send'
          disabled={this.state.isValid === false}
        />
      </view>
    );
  }
}

const styles = {
  textInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  textInputInContainer: {
    ...GlobalStyles.textInput,
    marginBottom: 0,
    marginTop: 0,
    borderBottomWidth: 0,
  },
  currencyNumber: {
    fontWeight: 'normal',
    color: Colors.BitnationDarkGrayColor,
  },
  toLabelText: {
    marginLeft: 5,
    marginTop: 10,
  },
  sendButton: {
    backgroundColor: Colors.BitnationHighlightColor,
    height: 50,
    borderRadius: 0,
    marginTop: 16,
  },
};
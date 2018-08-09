import React from 'react';
import { Modal } from 'pangea-sdk';

export default class CustomModal extends Modal {
  constructor(props) {
    super(props);
  }

  onButtonPress = () => {
    console.log('[HEY] We are on button press');
  };

  render() {
    return (
      <view style={{ flex: 1 }}>
        <button
          title='TAP ME'
          onPress={this.onButtonPress}
        />
      </view>
    );
  }
}

import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import theme from './theme';
import GlobalButton from './GlobalButton';
import GlobalImage from './GlobalImage';
import GlobalInput from './GlobalInput';
import GlobalText from './GlobalText';

import IconQRCodeScanner from '../../assets/images/IconQRCodeScanner.png';
import IconEdit from '../../assets/images/IconEdit.png';
import IconCopy from '../../assets/images/IconCopy.png';

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    width: '100%',
  },
  secondaryAction: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // borderLeftWidth: 1,
    // borderLeftColor: theme.colors.btnBrandLight,
  },
  touchableActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
  },
  inputStyle: {
    paddingRight: 60,
  },
});

const GlobalInputWithButton = ({
  placeholder,
  forSearch,
  startLabel,
  value,
  setValue,
  invalid,
  complete,
  inputStyle,
  numberOfLines,
  actionIcon,
  onActionPress,
  ...props
}) => {
  const handleChange = event => {
    if (setValue) {
      setValue(event.nativeEvent.text);
    }
  };
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputGroup}>
      <GlobalInput
        placeholder={placeholder}
        forSearch={forSearch}
        startLabel={startLabel}
        value={value}
        setValue={setValue}
        invalid={invalid}
        complete={complete}
        style={[styles.inputStyle, inputStyle]}
        numberOfLines={1}
        {...props}
      />

      {actionIcon && onActionPress && (
        <View style={styles.secondaryAction}>
          <GlobalButton
            onPress={onActionPress}
            touchableStyles={styles.touchableActionButton}
            transparent>
            {actionIcon === 'qr' && (
              <GlobalImage source={IconQRCodeScanner} size="xs" />
            )}
            {actionIcon === 'edit' && (
              <GlobalImage source={IconEdit} size="xs" />
            )}
            {actionIcon === 'copy' && (
              <GlobalImage source={IconCopy} size="xs" />
            )}
            {actionIcon === 'sendmax' && (
              <GlobalText type="button" color="primary">
                Max
              </GlobalText>
            )}
          </GlobalButton>
        </View>
      )}
    </View>
  );
};

export default GlobalInputWithButton;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import GlobalImage from '../../../component-library/Global/GlobalImage';
import GlobalPadding from '../../../component-library/Global/GlobalPadding';
import GlobalText from '../../../component-library/Global/GlobalText';

import theme from '../../../component-library/Global/theme';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    marginRight: theme.gutters.paddingSM,
    marginBottom: theme.gutters.paddingSM,
  },
});

export const DAppCard = ({ name, icon, origin }) => (
  <>
    <View style={styles.row}>
      <GlobalImage source={icon} size="md" style={styles.icon} />
      <GlobalText type="headline3" color="secondary">
        {name}
      </GlobalText>
      <GlobalPadding sm="sm" />
      <GlobalText color="secondary">{origin}</GlobalText>
    </View>
  </>
);

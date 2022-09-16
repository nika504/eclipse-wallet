import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { globalStyles } from '../../component-library/Global/theme';
import GlobalButton from '../Global/GlobalButton';
import GlobalPadding from '../Global/GlobalPadding';
import IconClose from '../../assets/images/IconClose.png';
import { View } from 'react-native';
import { withTranslation } from '../../hooks/useTranslations';

const SimpleDialog = ({ title, onClose, isOpen, action, text, t }) => (
  <Dialog
    fullWidth
    open={isOpen}
    onClose={onClose}
    maxWidth="xs"
    PaperProps={{
      style: { background: 'rgba(22,28,45, 0.9)' },
    }}>
    <DialogContent>
      <View>
        {!action && (
          <>
            <GlobalButton
              type="icon"
              transparent
              icon={IconClose}
              onPress={onClose}
              style={{
                position: 'absolute',
                bottom: -26,
                right: -24,
              }}
            />
            <GlobalPadding />
          </>
        )}
        {title}
      </View>

      <View>
        {text}
        {action && <GlobalPadding size="xl" />}
      </View>
      {action && (
        <View>
          <GlobalButton
            type="primary"
            flex
            title={t('actions.follow_us')}
            onPress={action}
            style={[globalStyles.button, globalStyles.buttonRight]}
            touchableStyles={globalStyles.buttonTouchable}
          />
          <GlobalPadding size="sm" />
          <GlobalButton
            type="secondary"
            flex
            title={t('actions.continue')}
            onPress={onClose}
            style={[globalStyles.button, globalStyles.buttonRight]}
            touchableStyles={globalStyles.buttonTouchable}
          />
        </View>
      )}
    </DialogContent>
  </Dialog>
);

export default withTranslation()(SimpleDialog);

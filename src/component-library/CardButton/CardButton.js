import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../Global/theme';
import GlobalButton from '../Global/GlobalButton';
import GlobalImage from '../Global/GlobalImage';
import GlobalText from '../Global/GlobalText';

import IconChevronRight from '../../assets/images/IconChevronRight.png';
import IconInteractionRed from '../../assets/images/IconInteractionRed.png';
import IconEdit from '../../assets/images/IconEdit.png';

const styles = StyleSheet.create({
  buttonCard: {
    width: '100%',
    marginBottom: theme.gutters.paddingNormal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonCardLarge: {
    minHeight: 80,
  },
  buttonCardXL: {
    minHeight: 94,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  spaceRight: {
    marginRight: theme.gutters.paddingSM,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    opacity: 0.9,
  },
  cardActions: {
    alignItems: 'flex-end',
  },
  onEditButtonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.gutters.responsivePadding * -0.5,
    marginLeft: theme.gutters.paddingXS,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.labelSecondary,
  },
  touchable: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.gutters.paddingXXS,
  },
});

const CardButton = ({
  type,
  icon,
  image,
  imageSize,
  title,
  description,
  children,
  active,
  complete,
  goToButton,
  actions,
  onPress,
  onEdit,
  touchableStyles,
}) => {
  const buttonStyle = {
    ...styles.buttonCard,
    ...(title && description && styles.buttonCardLarge),
    ...(type === 'large' ? styles.buttonCardXL : {}),
  };

  return (
    <GlobalButton
      type="card"
      color={active ? 'active' : null}
      title={!children ? title : null}
      onPress={onPress}
      style={buttonStyle}
      touchableStyles={touchableStyles}>
      <View style={styles.cardContent}>
        {icon && <View style={styles.spaceRight}>{icon}</View>}

        {image && (
          <GlobalImage
            source={image}
            size={imageSize}
            style={styles.spaceRight}
          />
        )}

        <View style={styles.main}>
          {title && (
            <GlobalText type="body2" numberOfLines={1}>
              {title}
            </GlobalText>
          )}

          {description && (
            <GlobalText
              type="caption"
              numberOfLines={1}
              style={styles.description}>
              {description}
            </GlobalText>
          )}
        </View>
      </View>

      {actions && <View style={styles.cardActions}>{actions}</View>}

      {complete && <GlobalImage source={IconInteractionRed} size="sm" />}

      {goToButton && <GlobalImage source={IconChevronRight} size="sm" />}

      {children && <View>{children}</View>}

      {onEdit && (
        <View style={styles.onEditButtonBox}>
          <GlobalButton
            style={styles.onEditButton}
            touchableStyles={styles.touchable}
            transparent>
            <GlobalImage source={IconEdit} size="sm" />
          </GlobalButton>
        </View>
      )}
    </GlobalButton>
  );
};
export default CardButton;

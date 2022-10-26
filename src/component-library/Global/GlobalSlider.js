import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { useKeenSliderNative } from 'keen-slider/react-native';
import theme, { globalStyles } from './theme';
import GlobalText from './GlobalText';
import GlobalImage from './GlobalImage';
import GlobalButton from './GlobalButton';
import GlobalPadding from './GlobalPadding';
import IconExpandMore from '../../assets/images/IconExpandMore.png';
import IconExpandLess from '../../assets/images/IconExpandLess.png';
import IconHyperspace from '../../assets/images/IconHyperspace.jpeg';

const { width: windowWidth } = Dimensions.get('window');
import AppIcon from '../../assets/images/AppIcon.png';

const styles = StyleSheet.create({
  sliderContainer: {
    paddingBottom: 50,
  },
  image: {
    marginRight: theme.gutters.paddingSM,
  },
  itemContainer: {
    marginBottom: theme.gutters.paddingSM,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapseButton: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: -20,
    backgroundColor: theme.colors.bgPrimary,
  },
  dotsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.gutters.paddingSM,
    flexDirection: 'row',
  },
  inactiveDot: {
    border: 'none',
    width: 10,
    height: 10,
    backgroundColor: '#6e7d86',
    borderRadius: '50%',
    marginLeft: 5,
    marginRight: 5,
    cursor: 'pointer',
  },
  activeDot: {
    border: 'none',
    width: 10,
    height: 10,
    backgroundColor: theme.colors.accentPrimary,
    borderRadius: '50%',
    marginLeft: 5,
    marginRight: 5,
    cursor: 'pointer',
  },
});

const GlobalSlider = ({
  // items,
  // renderItem,
  dots = true,
}) => {
  const [sliderHeight, setSliderHeight] = useState(294);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = 3;
  const slider = useKeenSliderNative({ slides });

  const sliderWidth = windowWidth - 28;

  const [items] = useState([
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
  ]);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: theme.colors.bgPrimary,
          borderRadius: theme.borderRadius.borderRadiusMD,
          height: sliderHeight,
          width: sliderWidth,
          padding: theme.gutters.paddingSM,
        }}>
        <View style={globalStyles.inlineFlexButtons}>
          <GlobalText type="body2">New collections</GlobalText>
          <GlobalImage
            circle
            source={IconHyperspace}
            size="xs"
            style={globalStyles.centeredSmall}
          />
        </View>
        <GlobalPadding size="sm" />
        {Array(2).fill(
          <View style={styles.itemContainer}>
            <GlobalImage source={AppIcon} size="xxl" style={styles.image} />
            <View>
              <GlobalText type="body2">Collection Name</GlobalText>
              <GlobalText type="caption">Collection Size Items</GlobalText>
              <GlobalText type="caption">Floor: Floor_Price</GlobalText>
              <GlobalText type="caption">1D Volume: Volume_1D</GlobalText>
            </View>
          </View>,
        )}
        {isCollapseOpen &&
          Array(4).fill(
            <View style={styles.itemContainer}>
              <GlobalImage source={AppIcon} size="xxl" style={styles.image} />
              <View>
                <GlobalText type="body2">Collection Name</GlobalText>
                <GlobalText type="caption">Collection Size Items</GlobalText>
                <GlobalText type="caption">Floor: Floor_Price</GlobalText>
                <GlobalText type="caption">1D Volume: Volume_1D</GlobalText>
              </View>
            </View>,
          )}
        <GlobalButton
          type="icon"
          transparent
          icon={isCollapseOpen ? IconExpandLess : IconExpandMore}
          onPress={toggleCollapse}
          size="medium"
          style={styles.collapseButton}
        />
      </View>
    );
  };

  const toggleCollapse = t => {
    setSliderHeight(isCollapseOpen ? 294 : 740);
    setIsCollapseOpen(!isCollapseOpen);
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={{ height: sliderHeight }} {...slider.containerProps}>
        {items?.map((item, index) => (
          <View key={index} {...slider.slidesProps[index]}>
            {renderItem(item, index)}
          </View>
        ))}
      </View>
      {dots && (
        <View style={styles.dotsContainer}>
          {items?.map(idx => (
            <TouchableOpacity
              onPress={() => {
                console.log('idx', idx);
                slider.moveToSlideRelative(idx);
              }}
              style={
                currentSlide === idx ? styles.activeDot : styles.inactiveDot
              }
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default GlobalSlider;

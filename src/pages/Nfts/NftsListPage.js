import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppContext } from '../../AppProvider';
import { useNavigation } from '../../routes/hooks';
import { withTranslation } from '../../hooks/useTranslations';
import { cache, CACHE_TYPES } from '../../utils/cache';
import { ROUTES_MAP as APP_ROUTES_MAP } from '../../routes/app-routes';
import { ROUTES_MAP as NFTS_ROUTES_MAP } from './routes';
import { isMoreThanOne } from '../../utils/nfts';

import theme, { globalStyles } from '../../component-library/Global/theme';
import GlobalSkeleton from '../../component-library/Global/GlobalSkeleton';
import GlobalLayout from '../../component-library/Global/GlobalLayout';
import GlobalNftList from '../../component-library/Global/GlobalNftList';
import GlobalText from '../../component-library/Global/GlobalText';
import Header from '../../component-library/Layout/Header';

import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker';
import { SECTIONS_MAP } from '../../utils/tracking';
import NftCollections from './components/NftCollections';

const NftsListPage = ({ t }) => {
  useAnalyticsEventTracker(SECTIONS_MAP.NFT_LIST);
  const navigate = useNavigation();
  const [{ activeWallet, config }] = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);
  const [listedInfo, setListedInfo] = useState([]);
  const [nftsGroup, setNftsGroup] = useState([]);

  useEffect(() => {
    if (activeWallet) {
      cache(
        `${activeWallet.networkId}-${activeWallet.getReceiveAddress()}`,
        CACHE_TYPES.NFTS,
        () => activeWallet.getAllNftsGrouped(),
      ).then(async nfts => {
        setNftsGroup(nfts);
        const listed = await activeWallet.getListedNfts();
        setListedInfo(listed);
        setLoaded(true);
      });
    }
  }, [activeWallet]);

  const goToBack = () => {
    navigate(APP_ROUTES_MAP.WALLET);
  };
  const onClick = nft => {
    if (isMoreThanOne(nft)) {
      navigate(NFTS_ROUTES_MAP.NFTS_COLLECTION, { id: nft.collection });
    } else {
      navigate(NFTS_ROUTES_MAP.NFTS_DETAIL, {
        id: nft.mint || nft.items[0].mint,
      });
    }
  };

  return (
    (
      <GlobalLayout>
        {loaded && (
          <GlobalLayout.Header>
            <Header activeWallet={activeWallet} config={config} t={t} />
            <View>
              <GlobalText center type="headline2">
                {t(`wallet.nfts`)}
              </GlobalText>
            </View>
            <NftCollections t />
            <View>
              <GlobalText type="headline3">{t(`wallet.my_nfts`)}</GlobalText>
            </View>
            <GlobalNftList
              nonFungibleTokens={nftsGroup}
              listedInfo={listedInfo}
              onClick={onClick}
            />
          </GlobalLayout.Header>
        )}
        {!loaded && <GlobalSkeleton type="NftListScreen" />}
      </GlobalLayout>
    ) || null
  );
};

export default withTranslation()(NftsListPage);

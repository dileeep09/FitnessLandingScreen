// InterstitialAdManager.js
import {useRef, useState} from 'react';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

export const useInterstitialAds = () => {
  const adStatusRef = useRef(null);

  const initInterstitial = async () => {
    const interstitialAd = InterstitialAd.createForAdRequest(
      TestIds.INTERSTITIAL,
    );
    interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      //   setAdStatus(interstitialAd);
      adStatusRef.current = interstitialAd;
      console.log('ad loaded');
    });
    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      interstitialAd.load();
    });
    interstitialAd.addAdEventListener(AdEventType.CLICKED, () => {
      console.log('ad clicked');
    });
    interstitialAd.addAdEventListener(AdEventType.ERROR, error => {
      console.log('load error', error.message);
    });
    interstitialAd.load();
  };

  const showInterstitialAd = navigation => {
    console.log('somedata-->', adStatusRef);
    if (adStatusRef.current?._loaded) {
      adStatusRef.current.show();
      console.log('trru');
      // It will navigate to the next screen while showing the ads
        navigation.navigate('Days');
      // } else {
        navigation.navigate('Days');
    }
  };

  return {initInterstitial, showInterstitialAd};
};
export const useRewardedAds = () => {
  const [adStatus, setAdStatus] = useState(null);

  const initReward = async () => {
    const rewardedAd = RewardedAd.createForAdRequest(
      TestIds.REWARDED,
    );
    rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setAdStatus(rewardedAd);
      console.log('ad loaded');
    });
    rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      rewardedAd.load();
    });
    //   interstitialAd.addAdEventListener(AdEventType.CLICKED, () => {
    //     console.log('ad clicked');
    //   });
    //   interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
    //       console.log('load error',error.message);
    //     });
    rewardedAd.load();
  };

  const showRewardedAd = async navigation => {
    if (adStatus?._loaded) {
      adStatus.show();
      // It will navigate to the next screen while showing the ads
    //   navigation.navigate('Days');
    } else {
    //   navigation.navigate('Days');
    }
  };

  return {initReward, showRewardedAd};
};
export const BannerAds=()=>{
    const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
    return(
        <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => console.log('banner ad loaded')}
        onAdFailedToLoad={() => console.log('Failed to load banner ad')}
        onAdOpened={()=>{console.log("Ad opened")}}
      />
    )
}
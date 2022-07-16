import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image as RNImage,
  ImageProps,
  ImageSourcePropType,
} from 'react-native';
import {Colors, View} from 'src/components';

interface ImageProps2 extends ImageProps {
  placeHolderWhenFailed?: ImageSourcePropType;
}
export const Image = ({source: s, ...props}: ImageProps2) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [source, setSource] = useState(s);
  useEffect(() => {
    if (
      !isError &&
      s.hasOwnProperty('uri') &&
      // @ts-ignore
      !s?.uri &&
      props.placeHolderWhenFailed
    ) {
      setSource(props.placeHolderWhenFailed);
    }
  }, [s]);
  useEffect(() => {
    if (isError && props.placeHolderWhenFailed) {
      setSource(props.placeHolderWhenFailed);
    }
  }, [isError]);

  const {width, height} = props.style as any;
  const copyStyle = props.style ? {width, height} : {};
  return (
    <View
      backgroundColor={'color1'}
      borderRadius={props.borderRadius}
      {...copyStyle}
      overflow={'hidden'}>
      <RNImage
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setIsError(true);
        }}
        source={source}
        {...props}
      />
      {loading ? (
        <View
          position={'absolute'}
          justifyContent={'center'}
          alignItems={'center'}
          left={0}
          top={0}
          right={0}
          bottom={0}>
          <ActivityIndicator size={'small'} color={Colors.color2} />
        </View>
      ) : null}
    </View>
  );
};

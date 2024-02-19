import React from 'react';
import LottieView from 'lottie-react-native';
import * as S from './styles';

export function Load() {
  return (
    <S.Container>
      <LottieView autoPlay source={require('./load.json')} loop style={{ width: 250 }} />
    </S.Container>
  );
}

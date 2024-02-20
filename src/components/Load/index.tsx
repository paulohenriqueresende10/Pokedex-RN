import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import * as S from './styles';

export function Load() {
  return (
    <S.Container>
      <AnimatedLottieView autoPlay source={require('./load.json')} loop style={{ flex: 1, width: 250}} />
    </S.Container>
  );
}

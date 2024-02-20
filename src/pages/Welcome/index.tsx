import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AnimatedLottieView from 'lottie-react-native';
import * as S from './styles';

type RootStackParamList = {
  Home: undefined;
};

export function Welcome() {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  function handleNavigateToHome() {
    navigate('Home');
  }

  return (
    <S.Container>
      <S.Content>
        <S.WrapperIcon>
          <S.IconContent>
            <AnimatedLottieView style={{flex:1}} autoPlay source={require('./pokemon.json')} loop />
          </S.IconContent>
        </S.WrapperIcon>

        <S.Title>Pokédex</S.Title>
        <S.SubTitle>Encontre todos os pokémons em um só lugar</S.SubTitle>
      </S.Content>

      <S.Bottom>
        <S.Button onPress={handleNavigateToHome}>
          <S.ButtonText>Entrar</S.ButtonText>
        </S.Button>
      </S.Bottom>
    </S.Container>
  );
}

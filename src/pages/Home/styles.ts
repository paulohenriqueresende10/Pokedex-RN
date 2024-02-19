import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

export const LoadingScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    flex: 1;
    position: relative;
  `}
`;

export const Header = styled.ImageBackground`
  ${({ theme }) => css`
    width: ${windowWidth}px;
    margin-left: -20px;
    height: 220px;
    background: ${theme.colors.background};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: 32px;
    line-height: 38px;
    font-weight: bold;
    margin-top: -70px;
  `}
`;

export const Text = styled.Text`
${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
  `}
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
      flex: 1;
      color: ${theme.colors.text};
    `}
`;

export const WrapperSearchBar = styled.View`
    padding: 20px;
    flex: 1;
    flex-direction: row;
    background-color: #F2F2F2;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

export const WrapperContent = styled.View`
    margin-top: 15px;
    flex-direction: row;
`;


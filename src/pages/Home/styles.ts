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
      color: ${theme.colors.text};
      border-radius: 10px;
      border: 1px solid black;
      padding: 20px;
      margin-top: 15px;
    `}
`;


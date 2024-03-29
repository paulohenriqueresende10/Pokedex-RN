import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 

import { StackNavigationProp } from '@react-navigation/stack';

import { Card } from '../../components/Card';
import { Load } from '../../components/Load';

import pokeballImage from '../../assets/img/pokeball.png';

import api from '../../services/api';

import * as S from './styles';
import { useNavigation } from '@react-navigation/native';

type PokemonType = {
  type: {
    name: string;
  };
};

type RootStackParamList = {
  About: { pokemonId: number } | undefined;
};

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
}

export interface Request {
  id: number;
  types: PokemonType[];
}

export function Home() {
  const MAX_LIMIT = 20;
  
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [load, setLoad] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setsearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(MAX_LIMIT);

  const getPokemons = async(): Promise<void> => {
    try {
      const response = await api.get(`/pokemon/${searchQuery}?offset=0&limit=${limit}`);
      const { results } = response.data;

      const payloadPokemons: Pokemon[] = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMoreInfoAboutPokemonsByUrl(
            pokemon.url,
          );

          return {
            name: pokemon.name,
            id,
            types,
          };
        }),
      );

      setPokemons(payloadPokemons);
      setFilteredPokemons(payloadPokemons);
    } catch (err) {    
      Alert.alert('ops, algo de errado aconteceu, tente mais tarde');
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
        setLimit(MAX_LIMIT);
        getPokemons();
        return;
    }
    const filteredPokemons = pokemons.filter(
      (pokemon) => pokemon.name.includes(searchQuery)
    );
    
    setFilteredPokemons(filteredPokemons);
  }, [searchQuery]);

  const getMoreInfoAboutPokemonsByUrl = async (url: string): Promise<Request> => {
    const response = await api.get(url);

    const { id, types } = response.data as Request;

    return { id, types };
  }

  const handleNavigationPokemonDetail = (pokemonId: number): void => {
    navigate('About', {
      pokemonId,
    });
  }

  const handleonendReached = (): void => {
    if (searchQuery === '') {
      setLimit((prev) => prev + MAX_LIMIT);
      getPokemons();
    }
  }

  return load ? (
    <S.LoadingScreen>
      <Load />
    </S.LoadingScreen>
  ) : (
    <>
      <S.Container>
        <FlatList
          onEndReachedThreshold={0.2}
          onEndReached={handleonendReached}
          ListHeaderComponent={
            <>
              <S.Header source={pokeballImage} />
              <S.Title> Pokédex</S.Title>
              <S.Text>Procure Pokémon pelo nome ou usando o número Pokédex Nacional.</S.Text>
              <S.WrapperContent>
                <S.WrapperSearchBar>
                  <EvilIcons name="search" size={24} color="#050617"/>    
                  <S.Input 
                    placeholder='Que Pokémon você está procurando?'
                    onChangeText={(text) => setsearchQuery(text)}
                    clearButtonMode='always'
                    autoCapitalize='none'               
                    autoCorrect={false}
                    value={searchQuery}
                  />
                </S.WrapperSearchBar>
              </S.WrapperContent>
            </>
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          data={filteredPokemons}
          keyExtractor={pokemon => pokemon.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: pokemon }) => (
            <Card
              data={pokemon}
              onPress={() => {
                handleNavigationPokemonDetail(pokemon.id);
              }}
            />
          )}
          ListFooterComponent={<ActivityIndicator size={'large'}/>}
        />
      </S.Container>
    </>
  );
}

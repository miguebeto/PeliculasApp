import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';

import Icon from 'react-native-vector-icons/Ionicons'
import { useMovieDetail } from '../hooks/useMovieDetail';
import { MovieDetail } from '../components/MovieDetail';

const screenHeight = Dimensions.get('screen').height


interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route, navigation}: Props) => {

  
  // const movie = route.params as Movie;
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {isLoading, movieFull, cast} = useMovieDetail(movie.id);  


  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.borderContainer}>
          <Image 
            source={{uri}}
            style={styles.posterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

        {
          isLoading
          ? <ActivityIndicator size={30} color={'red'} style={{marginTop: 20}}/>
          : <MovieDetail movieFull={movieFull!} cast={cast}/>
        }

        {/* Boton para cerrar  */}
        <TouchableOpacity
          onPress={()=>navigation.pop()} 
            style={styles.backButton}
        >
          <Icon 
            name='arrow-back-outline'
            color='white'
            size={60}
          />
        </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    height: screenHeight * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  borderContainer: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6
  },
  title: {
    fontSize: 20,
    fontWeight: '900'
    
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5   
  }
});


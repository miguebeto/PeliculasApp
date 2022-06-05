import React, { useContext } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors';

import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColor } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext)

  const getPosterColors = async (index: number) => {
  const movie = nowPlaying[index]
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
  const [primary= 'green', secondary= 'orange'] = await getImageColor(uri);
  setMainColors({primary, secondary});


    useEffect(() => {
        if( nowPlaying.length > 0 ) {
            getPosterColors(0)
        }
    }, [ nowPlaying ])
  
    
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={'red'} size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View style={{height: 440}}>
            {/* Carousel principal */}
            <Carousel
              data={nowPlaying!}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors( index )}
            />
          </View>

            {/* Peliculas populares */}
          <HorizontalSlider title='Top Rated' movies={topRated} />
          <HorizontalSlider title='Upcoming' movies={upcoming} />
          <HorizontalSlider title='Popular' movies={popular} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

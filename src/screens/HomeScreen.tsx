import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import { HorizontalSlider } from '../components/HorizontalSlider';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={'red'} size={100} />
      </View>
    );
  }

  return (
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
          />
        </View>

          {/* Peliculas populares */}
        <HorizontalSlider title='Top Rated' movies={topRated} />
        <HorizontalSlider title='Upcoming' movies={upcoming} />
        <HorizontalSlider title='Popular' movies={popular} />
      </View>
    </ScrollView>
  );
};

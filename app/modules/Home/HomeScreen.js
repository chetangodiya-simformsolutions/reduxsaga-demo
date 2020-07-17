import React, { useEffect } from 'react';
import {
  Text,
  StatusBar,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { Container, View } from 'native-base';
import styles from './styles/HomeScreenStyle';
import { Colors } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { UserPostActions } from '../../redux/actions';
import { FullScreenLoader } from '../../components';
import { number, object } from 'prop-types';

//animated list component

const RenderItems = ({ item, index, requestFor }) => {
  const { email = 'email', body = 'body', id = index } = item;
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => dispatch(UserPostActions.getSingle(id))}
      >
        <Animated.View style={[styles.cellContainer]}>
          <Text>{email}</Text>
          <Text>{body}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {requestFor === id && (
        <TouchableOpacity
          style={styles.cancelRequest}
          onPress={() => dispatch(UserPostActions.failedSingle())}
        >
          <Text>Cancel Request</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { list, error, fetching, requestFor } = useSelector(
    state => state.posts
  );

  useEffect(() => {
    dispatch(UserPostActions.requestUserPost());
  }, [dispatch]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      {error && <Text>{error}</Text>}

      <FlatList
        data={list}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <RenderItems {...{ item, index, requestFor }} />
        )}
        contentContainerStyle={styles.container}
        keyExtractor={data => data.id.toString()}
      />

      {fetching && <FullScreenLoader />}
    </Container>
  );
};

HomeScreen.propTypes = {};
RenderItems.propTypes = {
  item: object,
  index: number,
  requestFor: number
};
export default HomeScreen;

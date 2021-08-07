import React from 'react';
import {IItem} from '../types/CommonTypes';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {getFormattedTimeStamp} from '../helpers/getFormattedTimeStamp';

interface StoryItemProps {
  story: IItem;
}

const StoryItem = ({story}: StoryItemProps): JSX.Element => {
  const handleLink = () => {
    Linking.openURL(story.url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.link} onPress={handleLink}>
        {story.url}
      </Text>
      <Text>{getFormattedTimeStamp(story.time)}</Text>
      <Text>Score: {story.score}</Text>
      <Text>
        Author: {story.by}. Karma: {story.karma}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default StoryItem;

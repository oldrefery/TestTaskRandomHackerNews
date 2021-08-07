import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar} from 'react-native';
import axios from 'axios';

import hackerNewsApi from './src/api/hackerNewsApi';
import {getRandomNumbers} from './src/helpers/getRandomNumbers';
import {IItem} from './src/types/CommonTypes';
import StoryItem from './src/components/StoryItem';

const AMOUNT_RANDOM_NEWS = 10;

const App = () => {
  const [itemIds, setItemIds] = useState<number[]>([]);
  const [stories, setStories] = useState<IItem[]>([]);

  useEffect(() => {
    hackerNewsApi.get('topstories.json').then(res => {
      const newsIds: number[] = res.data;

      if (newsIds.length) {
        const randomizedIndexes = getRandomNumbers({
          start: 0,
          end: newsIds.length - 1,
          amount: AMOUNT_RANDOM_NEWS,
        });
        const randomizedIds = newsIds.filter((id, index) =>
          randomizedIndexes.includes(index),
        );

        setItemIds(randomizedIds);
        console.log(randomizedIds);
      }
    });
  }, []);

  useEffect(() => {
    if (itemIds.length) {
      const requests: Promise<any>[] = [];
      itemIds.forEach(id => {
        requests.push(hackerNewsApi.get(`item/${id}.json`));
      });
      axios
        .all(requests)
        .then(
          axios.spread((...responses) => {
            const storiesSortedByScore = responses
              .map(response => response.data)
              .sort((a, b) => b.score - a.score);

            getAuthorKarma(storiesSortedByScore);
          }),
        )
        .catch(err => console.log(err.message));
    }
  }, [itemIds]);

  const getAuthorKarma = (storiesSortedByScore: IItem[]) => {
    const authorIds: string[] = storiesSortedByScore.map(story => story.by);
    const uniqueAuthorIds = [...new Set(authorIds)];

    if (uniqueAuthorIds.length) {
      const requests: Promise<any>[] = [];

      uniqueAuthorIds.forEach(idAuthor => {
        requests.push(hackerNewsApi.get(`user/${idAuthor}.json`));
      });

      axios.all(requests).then(
        axios.spread((...responses) => {
          responses.forEach((response, index) => {
            storiesSortedByScore[index].karma = response.data.karma;
          });
          setStories(storiesSortedByScore);
        }),
      );
    }
  };

  const renderItem = ({item}: {item: IItem}) => {
    return <StoryItem story={item} />;
  };

  const keyExtractor = (item: IItem) => {
    return `id-${item.id}`;
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default App;

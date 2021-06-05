import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slots = [
  {
    id: 1,
    day: 'Today',
    slots: [
      {
        id: 1,
        name: 'Slot 1',
        time: '10AM to 11AM',
        user: '',
      },
      {
        id: 2,
        name: 'Slot 2',
        time: '12PM to 1PM',
        user: '',
      },
      {
        id: 3,
        name: 'Slot 3',
        time: '2PM to 3PM',
        user: '',
      },
    ],
  },

  {
    id: 2,
    day: 'Tomorrow',
    slots: [
      {
        id: 4,
        name: 'Slot 1',
        time: '10AM to 11AM',
        user: '',
      },
      {
        id: 5,
        name: 'Slot 2',
        time: '12PM to 1PM',
        user: '',
      },
      {
        id: 6,
        name: 'Slot 3',
        time: '2PM to 3PM',
        user: '',
      },
    ],
  },
  {
    id: 3,
    day: 'Day after tomorrow',
    slots: [
      {
        id: 7,
        name: 'Slot 1',
        time: '10AM to 11AM',
        user: '',
      },
      {
        id: 8,
        name: 'Slot 2',
        time: '12PM to 1PM',
        user: '',
      },
      {
        id: 9,
        name: 'Slot 3',
        time: '2PM to 3PM',
        user: '',
      },
    ],
  },
];

const Home = ({route, navigation}) => {
  const user = route.params;
  const [timeSlot, settimeSlot] = useState(slots);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          console.log('value', value);
          settimeSlot(JSON.parse(value));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      const filteredArray = timeSlot.filter(element =>
        element.slots.some(subElement => subElement.id === user.itemId),
      );
      const objIndex = filteredArray[0].slots.findIndex(
        item => item.id === user.itemId,
      );
      filteredArray[0].slots[objIndex].user = user;
      const array = [...timeSlot, ...filteredArray];
      const filterObj = array.filter(
        (v, i, a) => a.findIndex(t => t.id === v.id) === i,
      );
      settimeSlot(filterObj);
      const jsonValue = JSON.stringify(filterObj);
      const storeData = async () => {
        try {
          await AsyncStorage.setItem('@storage_Key', jsonValue);
        } catch (e) {
          console.log(e);
        }
      };
      storeData();
    }
  }, [route]);

  const onNvaigateToUser = id => {
    navigation.navigate('User', {itemId: id});
  };

  const renderItem = ({item}) => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{item.day}</Text>
      {item.slots.map((obj, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => obj.user === '' && onNvaigateToUser(obj.id)}>
              <Text style={styles.cardTitle}>{obj.name}</Text>
              <Text style={styles.cardTitle}>{obj.time}</Text>
              {obj.user !== '' && (
                <View style={styles.bordeStyle}>
                  <Text style={styles.userItem}>Name: {obj.user?.name}</Text>
                  <Text style={styles.userItem}>Email: {obj.user?.email}</Text>
                  <Text style={styles.userItem}>Phone: {obj.user?.phone}</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.verticleLine} />
          </View>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={timeSlot}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  cardContainer: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  verticleLine: {
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee',
    marginHorizontal: 20,
  },
  bordeStyle: {
    borderColor: '#707070',
    borderWidth: 1,
    marginVertical: 5,
  },
  userItem: {
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Home;

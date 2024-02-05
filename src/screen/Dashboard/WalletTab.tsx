import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ViewContainer from '../../component/ViewContainer';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import {useNavigation} from '@react-navigation/native';
import {BODY_IMAGE} from '../../util/imageUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  status: 'pending' | 'debited' | 'created';
  type: 'Credit' | 'Swap' | 'Debit';
}

const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

const WalletTab = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Generate 50 dummy data entries with various transaction types and random amounts
    const dummyData: Transaction[] = Array.from({length: 50}, (_, index) => {
      const transactionTypes: Transaction['type'][] = [
        'Credit',
        'Swap',
        'Debit',
      ];
      const randomType =
        transactionTypes[Math.floor(Math.random() * transactionTypes.length)];

      const randomAmount = Math.floor(Math.random() * 1000) + 1; // Random amount between 1 and 1000
      const currentDate = new Date();
      const randomDateTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - Math.floor(Math.random() * 7),
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60),
        Math.floor(Math.random() * 60),
      );
      // Random date within the last 7 days

      return {
        id: index.toString(),
        amount: randomAmount,
        description: `RocketPay  ${index + 1}`,
        status:
          index % 3 === 0 ? 'pending' : index % 3 === 1 ? 'debited' : 'created',
        type: randomType,
        dateTime: randomDateTime,
      };
    });

    setTransactions(dummyData);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <ViewContainer>
      <ImageBackground source={BODY_IMAGE.homeCard} style={styles.homeCard}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: HP(10),
          }}>
          <View>
            <Text style={styles.price}>₦10000</Text>
          </View>
        </View>
      </ImageBackground>

      <View>
        <Text style={styles.history}>Transaction History</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionI}>{item.description}</Text>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.date}>{formatAMPM(item.dateTime)}</Text>
                <Text> </Text>
                <Text style={styles.date}>{formatDate(item.dateTime)}</Text>
              </View>
            </View>

            <View style={{width: WP(20)}}>
              <View>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.amount}>NGN{item.amount}</Text>
              </View>
              {/* 
            <Text>Status: {item.status}</Text> */}
            </View>
          </View>
        )}
      />
    </ViewContainer>
  );
};

export default WalletTab;

const styles = StyleSheet.create({
  homeCard: {
    width: '100%',
    height: HP(20),
    borderRadius: 1420,
    backgroundColor: 'red',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: WP(3),
    borderWidth: 0.3,
    padding: 10,
    // borderLeftWidth:0,
    // borderRightWidth:0,
  },
  type: {
    fontFamily: FONTFAMILY.medium,
    color: COLOR.black,
    textTransform: 'capitalize',
    // fontWeight: 'bold',
  },
  transactionI: {
    fontFamily: FONTFAMILY.medium,
    color: COLOR.black,
    fontSize: WP(3.5),
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: WP(3),
    fontFamily: FONTFAMILY.regular,
  },
  amount: {
    fontFamily: FONTFAMILY.regular,
    fontSize: WP(3),
  },
  history: {
    fontFamily: FONTFAMILY.bold,
    fontSize: WP(5),
    color: COLOR.black,
    paddingBottom:30,
    paddingTop:20
  },
  price: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: FONTFAMILY.regular,
    color: COLOR.white,
    
  },
});

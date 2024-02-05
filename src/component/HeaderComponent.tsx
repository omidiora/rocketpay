import {StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../assets/images/svgs/logo.svg';
import {COLOR} from '../util/Textutils';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const HeaderComponent = () => {
  const navigation=useNavigation()
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={COLOR.blue}
        barStyle={'dark-content'}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <View style={styles.row}>
       <TouchableOpacity onPress={()=>navigation.goBack()}>
       <Ionicons name="arrow-back" size={32} color={COLOR.dark} />
       </TouchableOpacity>
       <Entypo name='rocket' size={30} color={COLOR.black}/>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

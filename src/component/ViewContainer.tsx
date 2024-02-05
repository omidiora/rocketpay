import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderComponent from './HeaderComponent';
import { COLOR } from '../util/Textutils';

interface ViewContainerProps {
  children: React.ReactNode;
}

const ViewContainer: React.FC<ViewContainerProps> = ({ children }) => {
  return (
    <View style={styles.container}>
          <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.blue,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop:40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ViewContainer;

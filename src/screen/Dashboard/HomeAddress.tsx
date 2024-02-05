import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import {AddressValidationSchema} from '../Register/validation';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Geolocation, {GeolocationResult} from 'react-native-geocoding';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAWdCtVqkxRnBf2P502Flm2Gs8cyUNc1_I');



const HomeAddress = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setloading] = useState<boolean>(false);

  const [date, setDate] = useState<Date>(new Date());

  const handleGetLocation = async (): Promise<void> => {
    setloading(true)
    try {
      const result: GeolocationResult = await Geolocation.from(values.address.trim());

      if (result.results.length > 0) {
        const {lat, lng} = result.results[0].geometry.location;
        setCoordinates({latitude: lat, longitude: lng});
        setloading(false)
        Alert.alert('Location Found', `Latitude: ${lat}, Longitude: ${lng}`);
      } else {
        setloading(false)
        Alert.alert('Location Not Found', 'Please enter a valid address');
      }
    } catch (error) {
      setloading(false)
      Alert.alert('Location Not Found', 'Please enter a valid address');
    }
  };

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik({
    initialValues: {
      address: '',
    },
    validationSchema: AddressValidationSchema,
    onSubmit: () => handleGetLocation(),
  });

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 130}}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Let’s get to know you</Text>
          <Text style={styles.email}>
            Please fill in the address to get your latitude and lotitude
          </Text>
          <View style={styles.form}>
            <FormInput
              label="Home Address"
              placeholder="Enter Home Address"
              onChangeText={handleChange('address')}
              error={errors.address}
            />
          </View>

          <TouchableOpacity
            style={styles.proceedContainer}
            onPress={() => handleSubmit()}>
            {loading ? (
              <ActivityIndicator color={COLOR.white} />
            ) : (
              <Text style={styles.proceed}>Get Location</Text>
            )}
          </TouchableOpacity>
        </View>
      </ViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default HomeAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  login: {
    fontSize: WP(5),
    fontFamily: FONTFAMILY.bold,
    color: COLOR.dark,
  },
  content: {
    paddingTop: HP(5),
    paddingLeft: WP(2),
  },
  email: {
    fontSize: WP(4),
    fontFamily: FONTFAMILY.medium,
    paddingTop: HP(1.2),
    width: '80%',
  },

  form: {
    paddingTop: HP(3),
  },
  online: {
    marginTop: HP(30),
  },
  access: {
    textAlign: 'center',
    color: COLOR.dark,
    fontFamily: 'Lexend-Bold',
  },
  proceedContainer: {
    backgroundColor: COLOR.green,
    padding: HP(1.8),
    width: WP(85),
    marginTop: HP(5),
    borderRadius: 10,
  },
  proceed: {
    textAlign: 'center',
    color: COLOR.black,
    fontFamily: FONTFAMILY.medium,
  },
});

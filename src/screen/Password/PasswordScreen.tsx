import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/svgs/logo.svg';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {useFormik} from 'formik';
import {PasswordValidationSchema} from '../Register/validation';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {setPassword} from '../../redux/AuthSlice';

import {useDispatch} from 'react-redux';
const PasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: PasswordValidationSchema,
    onSubmit: () => PasswordSet(),
  });

  
  const PasswordSet = () => {
    dispatch(setPassword(values?.password));
    navigation.navigate('SignUp', {
      pWord: values,
    });
  };


  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Create your password</Text>
          <Text style={styles.email}>
            Create your log in password to keep your account secure
          </Text>
          <View style={styles.form}>
            <FormInput
              label="Password"
              placeholder="Password"
              onChangeText={handleChange('password')}
              password={true}
              error={errors?.password}
            />

            <View style={styles.checkBoxContainer}>
              <TouchableOpacity>
                <Ionicons name="checkbox" size={22} color={COLOR.green} />
              </TouchableOpacity>
              <Text style={styles.bySigin}>
                By signing up, I confirm I accept the Terms of Use
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.proceedContainer}
            onPress={() => handleSubmit()}>
            <Text style={styles.proceed}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default PasswordScreen;

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
    color: COLOR.black,
    opacity:0.6
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
    color: COLOR.dark,
    fontFamily: FONTFAMILY.medium,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  bySigin: {
    marginLeft: 3,
    fontFamily: FONTFAMILY.medium,
    color: COLOR.primaryDark,
    fontSize: WP(3),
  },
});

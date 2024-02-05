import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {
  RegistrationValidationSchema,
} from './validation';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState<boolean>(false);
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
    },
    validationSchema: RegistrationValidationSchema,
    onSubmit: () => handleRegistration(),
  });

  const handleRegistration = async () => {
    setloading(true);
    try {
      const a = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      
      // Additional steps to store full name in the user profile
      await auth().currentUser.updateProfile({
        displayName: values.fullName,
      });
      navigation.navigate('Dasbhoard');
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error('Registration failed', error);
    } finally {
      setloading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} 
    contentContainerStyle={{paddingBottom:40}}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Sign up</Text>
          <Text style={styles.email}>
            We will use this email address to authenticate logins to your
            account
          </Text>
          <View style={styles.form}>
            <FormInput
              label="Full Name"
              placeholder="Full Name"
              error={errors.fullName}
              onChangeText={handleChange('fullName')}
            />

            <FormInput
              label="Email Address"
              placeholder="Email Address"
              error={errors.email}
              onChangeText={handleChange('email')}
            />

            <FormInput
              label="Password"
              placeholder="Password"
              error={errors.password}
              onChangeText={handleChange('password')}
              password={true}
            />
          </View>

          <TouchableOpacity
            style={styles.proceedContainer}
            onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={styles.proceed}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.already}>
            <Text style={styles.have}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('auth', {screen: 'Login'})}>
              <Text style={styles.sigin}>signin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

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
    opacity: 0.6,
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
  sigin: {
    color: COLOR.black,
    fontFamily: FONTFAMILY.regular,
  },
  already: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 20,
    fontFamily: FONTFAMILY.regular,
  },
  have: {
    fontFamily: FONTFAMILY.regular,
  },
});

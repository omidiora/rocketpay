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
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/svgs/logo.svg';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {useFormik} from 'formik';
import {LoginValidationSchema} from '../Register/validation';
import {useLoginApiMutation} from '../../redux/AuthApi';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

interface LoginValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setloading] = React.useState<boolean>(false);
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik<LoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: () => handleLogin(),
  });

  const handleLogin = async () => {
    setloading(true);
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      navigation.navigate('Dasbhoard');
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error.message, 'erdadfror');
      // console.error('Login failed', error);
    } finally {
      setloading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Log in</Text>
          <Text style={styles.email}>
            Enter email address and password to log in
          </Text>
          <View style={styles.form}>
            <FormInput
              label="Email Address"
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              error={errors.email}
            />
            <FormInput
              label="Password"
              placeholder="Type here"
              password={true}
              onChangeText={handleChange('password')}
              error={errors.password}
            />
          </View>

          <TouchableOpacity
            style={styles.proceedContainer}
            onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color={COLOR.white} />
            ) : (
              <Text style={styles.proceed}>Proceed</Text>
            )}
          </TouchableOpacity>
          <View style={styles.dont}>
            <Text style={styles.have}>Don't have an account ?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Dashboard")}>
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ViewContainer>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    width: WP(90),
    alignSelf: 'center',
    marginTop: HP(3),
    borderRadius: 10,
    marginLeft: -20,
  },
  proceed: {
    textAlign: 'center',
    color: COLOR.black,
    fontFamily: FONTFAMILY.medium,
  },
  dont: {
    alignSelf: 'center',
     flexDirection: 'row', 
     paddingTop: HP(3)
    },
    have:{
      fontFamily:FONTFAMILY.regular,
      
    },
    register:{
      fontFamily:FONTFAMILY.regular,
      color:COLOR.black
    }
});

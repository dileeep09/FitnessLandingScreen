import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
  ImageBackground,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {DeviceHeigth, DeviceWidth} from '../Components/config';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin, setUserData} from '../Redux/Actions';
import {Img} from '../LocalVideo/Video';
import {TextInput} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import * as yup from 'yup';
import {Formik} from 'formik';
const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1= () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const Dispatch = useDispatch();
  const {getUserData} = useSelector(state => state);
  const [activeView, setActiveView] = useState('login');
  console.log("userData-->",getUserData)
  const translateX = useRef(new Animated.Value(0)).current;
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup.string().required('Password is required'),
  });
  const signupValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email Address in Required'),
    password: yup
      .string()
      .matches(/(?=.*[a-zA-Z])/, 'Password must contain at least one alphabet')
      .matches(
        /(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required("Password is Required"),
    confirmPassword: yup
      .string()
      .matches(/(?=.*[a-zA-Z])/, 'Password must contain at least one alphabet')
      .matches(
        /(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required("Confirm Password is Required")
  });
  const handleLoginPress = () => {
    if (activeView !== 'login') {
      setActiveView('login');
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };
  const handleSignupPress = () => {
    if (activeView !== 'signup') {
      setActiveView('signup');
      Animated.spring(translateX, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  // const handleSubmit = () => {
  //   if (activeView == 'login') {
  //     if (!userName) {
  //       Toast.show('This is a styled toast on iOS.', Toast.LONG, {
  //         backgroundColor: 'blue',
  //       });
  //       // Alert.alert('Please Enter your email', '');
  //     } else if (!reg.test(userName)) {
  //       Alert.alert('Please enter a valid email');
  //     } else if (!Password) {
  //       Alert.alert('Please enter your password', '');
  //     } else if (getUserData?.length == 0) {
  //       Alert.alert('Please Signup first');
  //     } else if (
  //       !(
  //         userName == getUserData[0]?.Email &&
  //         Password == getUserData[0].password
  //       )
  //     ) {
  //       Alert.alert('Please provide correct credentials');
  //     } else {
  //       Dispatch(setIsLogin(true));
  //       navigation.navigate('Home');
  //     }
  //   } else if (activeView == 'signup') {
  //     if (!Name) {
  //       Alert.alert('Please enter your name');
  //     } else if (!userName) {
  //       Alert.alert('Please Enter your email', '');
  //     } else if (!reg.test(userName)) {
  //       Alert.alert('Please enter a valid email');
  //     } else if (!Password) {
  //       Alert.alert('Please enter your password', '');
  //     } else if (!ConfirmPassword) {
  //       Alert.alert('Please enter confirm password ');
  //     } else if (!(Password === ConfirmPassword)) {
  //       Alert.alert('Passwords are not matching', ' ');
  //     } else {
  //       Dispatch(
  //         setUserData([{Name: Name, Email: userName, password: Password}]),
  //       );
  //       setTimeout(() => {
  //         navigation.navigate('Login');
  //       }, 500);
  //     }
  //   }
  // };
  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
       <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'position' : 'position'}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={Img.backgound_login}
          style={{
            width: DeviceWidth,
            height: DeviceHeigth * 0.55,
            opacity: 0.8,
          }}
          resizeMode="stretch">
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleLoginPress}>
              <View>
                <Text style={styles.text}>Login</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleSignupPress}>
              <View>
                <Text style={styles.text}>Signup</Text>
              </View>
            </TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.underline,
                {
                  transform: [
                    {
                      translateX: translateX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [5, 65], // Adjust the value as needed
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </ImageBackground>
          {activeView === 'login' && (
            <Animated.View
              style={[
                styles.form,
                {
                  transform: [
                    {
                      translateX: translateX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -DeviceWidth], // Adjust the value as needed
                      }),
                    },
                  ],
                },
              ]}>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{email: '', password: ''}}
                onSubmit={values =>
                  {
                if(getUserData.length==0){
                  Toast.show("Please Signup first",Toast.LONG,{backgroundColor:'#D0FD3E'})
                  handleSignupPress()
                }
               else  if(values.email==getUserData[0]?.email && values.password==getUserData[0]?.password){
                 Toast.show("Login Successful",Toast.LONG,{backgroundColor:'#D0FD3E'})
                 Dispatch(setIsLogin(true))
                 navigation.navigate("DrawerNavigation")
                }else if(!(values.email==getUserData[0]?.email && values.password==getUserData[0]?.password)){
                  Toast.show("Please Provide correct credentials")
                }
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <>
                    <TextInput
                      mode="flat"
                      activeUnderlineColor="#fff"
                      textColor="#fff"
                      placeholderTextColor={'#fff'}
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                      style={{
                        backgroundColor: '#2C2C2E',
                        width: DeviceWidth * 0.85,
                        alignSelf: 'center',
                        height: 55,
                      }}
                    />
                    {errors.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        {errors.email}
                      </Text>
                    )}
                    <TextInput
                      mode="flat"
                      activeUnderlineColor="#fff"
                      textColor="#fff"
                      placeholderTextColor={'#fff'}
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={!showPassword}
                      style={{
                        backgroundColor: '#2C2C2E',
                        width: DeviceWidth * 0.85,
                        alignSelf: 'center',
                        height: 55,
                      }}
                      right={ <TextInput.Icon
                        icon={showPassword ?'eye' :   'eye-off'}
                        onPress={togglePasswordVisibility}
                        color="#fff" 
                      />}
                    />
                    {errors.password && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        {errors.password}
                      </Text>
                    )}
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: 100,
                        marginRight: DeviceWidth * 0.08,
                      }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#D0FD3E',
                          width: DeviceWidth * 0.25,
                          height: DeviceHeigth * 0.05,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          handleSubmit();
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 16,
                            textAlign: 'center',
                          }}>
                          Login
                        </Text>
                        <Icons name="play" size={25} color={'#000'} />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </Animated.View>
          )}
          {activeView === 'signup' && (
            <Animated.View
              style={[
                styles.form,
                {
                  transform: [
                    {
                      translateX: translateX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [DeviceWidth, 0], // Adjust the value as needed
                      }),
                    },
                  ],
                },
              ]}>
              <Formik
                validationSchema={signupValidationSchema}
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={values => {console.log(values)
                Dispatch(setUserData([values]))  
                handleLoginPress()
                Toast.show("Account created! Please login ",Toast.LONG,{backgroundColor:'red'})
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <>
                    <TextInput
                      mode="flat"
                      activeUnderlineColor="#fff"
                      textColor="#fff"
                      placeholderTextColor={'#fff'}
                      placeholder="Name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      style={{
                        backgroundColor: '#2C2C2E',
                        width: DeviceWidth * 0.85,
                        alignSelf: 'center',
                        height: 55,
                      }}
                    />
                    {errors.name && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        {errors.name}
                      </Text>
                    )}
                    <TextInput
                      mode="flat"
                      activeUnderlineColor="#fff"
                      textColor="#fff"
                      placeholderTextColor={'#fff'}
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={{
                        backgroundColor: '#2C2C2E',
                        width: DeviceWidth * 0.85,
                        alignSelf: 'center',
                        height: 55,
                      }}
                    />
                    {errors.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        {errors.email}
                      </Text>
                    )}
                    <TextInput
                      mode="flat"
                      activeUnderlineColor="#fff"
                      textColor="#fff"
                      placeholderTextColor={'#fff'}
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={!showPassword1}
                      style={{
                        backgroundColor: '#2C2C2E',
                        width: DeviceWidth * 0.85,
                        alignSelf: 'center',
                        height: 55,
                      }}
                      right={ <TextInput.Icon
                        icon={showPassword1 ?'eye' :   'eye-off'}
                        onPress={togglePasswordVisibility1}
                        color="#fff" 
                      />}
                    />
                    {errors.password && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        {errors.password}
                      </Text>
                    )}
                    <TextInput
                      mode="flat"
                      activeUnderlineColor="#fff"
                      textColor="#fff"
                      placeholderTextColor={'#fff'}
                      placeholder="Confirm Password"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry={!showPassword2}
                      style={{
                        backgroundColor: '#2C2C2E',
                        width: DeviceWidth * 0.85,
                        alignSelf: 'center',
                        height: 55,
                      }}
                      right={ <TextInput.Icon
                        icon={showPassword2 ?'eye' :   'eye-off'}
                        onPress={togglePasswordVisibility2}
                        color="#fff" 
                      />}
                    />
                    {errors.confirmPassword && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#D0FD3E',
                        width: DeviceWidth * 0.25,
                        height: DeviceHeigth * 0.05,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginVertical: 30,
                        alignSelf: 'flex-end',
                        marginRight: DeviceWidth * 0.08,
                      }}
                      onPress={() => handleSubmit()}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          textAlign: 'center',
                          fontWeight: '600',
                        }}>
                        Signup
                      </Text>
                      <Icons name="play" size={25} color={'#000'} />
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </Animated.View>
          )}

      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  input: {
    height: DeviceHeigth * 0.04,
    width: DeviceWidth * 0.8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  container: {
    flexDirection: 'row',
    marginTop: 85,
    marginLeft: 30,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 10,
    color: '#fff',
    fontWeight: '600',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 7,
    top: 27,
    width: 40, // Width of the underline
    height: 4, // Height of the underline
    backgroundColor: '#D0FD3E',
    borderRadius: 20, // Color of the underline
  },
});
export default Login;

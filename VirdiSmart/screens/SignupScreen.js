import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  ScrollView,
} from 'react-native'
import { Button, TextInput, Avatar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignupScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpass, setcPass] = useState()
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [err, setError] = useState('')

  // const showToast = (msg) => {
  //   ToastAndroid.show(msg,ToastAndroid.SHORT);
  // };

  const validatePassword = () => {
    if (password === cpass) return true
    else return false
  }

  sendCred = (props) => {
    var isValid = validatePassword()
    if (isValid) {
      console.log(email, password, fname, lname, phone)
      fetch('https://virdismart.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          fname: fname,
          lname: lname,
          phone: phone,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data)
          try {
            await AsyncStorage.setItem('token', data.token)
            props.navigation.navigate('login')
          } catch (e) {
            // saving error
            console.log('Error Async Storage', e)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setError('Password do not match!')
    }
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <KeyboardAvoidingView behavior='padding'>
          <StatusBar backgroundColor='green' />
          <Avatar.Image
            size={94}
            style={{ marginLeft: 150, backgroundColor: ' transparent ' }}
            source={require('../images/virdis.png')}
          />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 18,
            }}
          >
            Create new Account
          </Text>

          <Text>{err}</Text>

          <TextInput
            label='Email'
            mode='outlined'
            theme={{ colors: { primary: 'blue' } }}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            label='First Name'
            mode='outlined'
            theme={{ colors: { primary: 'blue' } }}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            value={fname}
            onChangeText={(text) => setFname(text)}
          />

          <TextInput
            label='Second Name'
            mode='outlined'
            theme={{ colors: { primary: 'blue' } }}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            value={lname}
            onChangeText={(text) => setLname(text)}
          />

          <TextInput
            label='Phone Number'
            keyboardType='numeric'
            mode='outlined'
            theme={{ colors: { primary: 'blue' } }}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <TextInput
            label='Password'
            mode='outlined'
            secureTextEntry={true}
            theme={{ colors: { primary: 'blue' } }}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TextInput
            label='confirm password'
            mode='outlined'
            secureTextEntry={true}
            theme={{ colors: { primary: 'blue' } }}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            value={cpass}
            onChangeText={(text) => setcPass(text)}
          />

          <Button
            mode='contained'
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            onPress={() => sendCred(props)}
          >
            Signup
          </Button>

          <TouchableOpacity>
            <Text
              style={{ fontSize: 18, marginLeft: 18, marginTop: 20 }}
              onPress={() => props.navigation.navigate('login')}
            >
              Already have an account ? Click to login
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

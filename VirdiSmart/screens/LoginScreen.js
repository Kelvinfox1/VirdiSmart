import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import {
  Button,
  TextInput,
  Avatar,
  Dialog,
  Portal,
  Paragraph,
  Provider,
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState()

  sendCred = (props) => {
    console.log(email, password)
    fetch('https://virdismart.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data)
        if (data.error) {
          setError(data.error)
        }

        try {
          await AsyncStorage.setItem('token', data.token)
          props.navigation.replace('home')
        } catch (e) {
          // saving error
          console.log('Error Async Storage', e)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <View style={{ marginTop: 40 }}>
      <KeyboardAvoidingView behavior='padding'>
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
          Login with email
        </Text>

        {err ? (
          <Text style={{ fontSize: 16, marginLeft: 25, color: 'red' }}>
            {err}
          </Text>
        ) : (
          <Text></Text>
        )}

        <TextInput
          label='Email'
          mode='outlined'
          theme={{ colors: { primary: 'blue' } }}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
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

        <Button
          mode='contained'
          style={{
            marginLeft: 18,
            marginRight: 18,
            marginTop: 18,
            backgroundColor: 'blue',
          }}
          onPress={() => sendCred(props)}
        >
          Login
        </Button>

        <TouchableOpacity>
          <Text
            style={{ fontSize: 18, marginLeft: 18, marginTop: 20 }}
            onPress={() => props.navigation.navigate('signup')}
          >
            Don't have an account ? Click to sign-up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

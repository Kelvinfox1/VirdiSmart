import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Button,
  TextInput,
  Card,
  Title,
  Paragraph,
  Avatar,
} from 'react-native-paper'

export default function HomeScreen(props) {
  const [email, setEmail] = useState()

  fetchUser = async () => {
    const token = await AsyncStorage.getItem('token')

    fetch('https://77db903c94ac.ngrok.io:5000/me', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchUser()
  })

  const logout = async () => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.replace('login')
    })
  }

  return (
    <View>
      <Text style={{ fontSize: 18 }}>{email}</Text>
      <Button
        mode='contained'
        style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        onPress={() => logout()}
      >
        Logout
      </Button>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Your QR Code</Title>
          <Paragraph>Scan with our Bin to earn points</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 20,
  },
})

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
import { QRCode } from 'react-native-custom-qr-codes-expo'

export default function HomeScreen(props) {
  const [email, setEmail] = useState()
  const [points, setPoints] = useState()
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [qrId, setQrId] = useState()
  const [CardId, setCardId] = useState()

  const userQrcode = { qrId }
  const qrcode = JSON.stringify(userQrcode)

  fetchUser = async () => {
    const token = await AsyncStorage.getItem('token')

    fetch('https://virdismart.herokuapp.com/profile', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email)
        setPoints(data.points)
        setFname(data.fname)
        setLname(data.lname)
        setQrId(data.qrId)
        setCardId(data.CardId)
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
      <Text style={{ fontSize: 18 }}>
        Welcome {fname} {lname}
      </Text>
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
          <QRCode content={qrcode} />
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>User Info</Title>
          <Paragraph>Email : {email}</Paragraph>
          <Paragraph>Points : {points} </Paragraph>
          <Paragraph>Card ID : {CardId}</Paragraph>
        </Card.Content>
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

import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from 'react-native'
import firebase from 'firebase'

import FormRow from '../components/FormRow'

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyCOD9WRHkcifRXsE6gnvndinmyTyP-501M",
            authDomain: "series-ff7bc.firebaseapp.com",
            databaseURL: "https://series-ff7bc.firebaseio.com",
            projectId: "series-ff7bc",
            storageBucket: "series-ff7bc.appspot.com",
            messagingSenderId: "812950804078",
            appId: "1:812950804078:web:b955f8fc8f133637efb87f",
            measurementId: "G-950EZDJP5H"
          };
          if (!firebase.apps.length) {
              firebase.initializeApp(firebaseConfig)
          }
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        })
    }

    tryLogin() {
        this.setState({isLoading: true, message: ''})
        const { email, password } = this.state

        const loginUserSuccess = user => {
            this.setState({message: 'Sucesso!'})
            this.props.navigation.navigate('Main')
        }

        const loginUserFailed = error => {
            this.setState({message: this.getMessageByErrorCode(error.code)})
        }

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(loginUserSuccess)
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas?',
                        [{
                            text: 'Não',
                            onPress: () => {},
                            style: 'cancel'
                        }, {
                            text: 'Sim',
                            onPress: () => {
                                firebase.auth()
                                    .createUserWithEmailAndPassword(email, password)
                                    .then(loginUserSuccess)
                                    .catch(loginUserFailed)
                            }
                        }],
                        { cancelable: false }
                    )
                    return
                }
                loginUserFailed(error)
            })
            .then(() => this.setState({ isLoading: false }))
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta'
            case 'auth/user-not-found':
                return 'Usuário não encontrado'
            case 'auth/invalid-email':
                return 'E-mail inválido'
            default:
                return 'Erro desconhecido'
        }
    }

    renderMessage() {
        const { message } = this.state
        if (!message) {
            return null
        }

        return (
            <View>
                <Text>{message}</Text>
            </View>
        )
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        }
        return (
            <Button title="Entrar" onPress={() => this.tryLogin()}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.email}
                        onChangeText={value => this.onChangeHandler('email', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput
                        style={styles.input}
                        placeholder="*********"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                {this.renderButton()}
                {this.renderMessage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
})
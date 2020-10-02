const USER_LOGIN = 'USER_LOGIN'
const userLogin = user => {
    return {
        type: USER_LOGIN,
        user
    }
}

const USER_LOGOUT = 'USER_LOGOUT'
const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const tryLogin = ({ email, password }) => {
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
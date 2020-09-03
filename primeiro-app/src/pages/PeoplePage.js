import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import axios from 'axios'
import { render } from 'react-dom'

import PeopleList from '../components/People_list'

export default class PeoplePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      peoples: [],
      loading: false,
      error: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    setTimeout(() => {
      axios.get('https://randomuserasdasdasd.me/api/?nat=br&results=150')
      .then(response => {
        const { results } = response.data
        this.setState({
          peoples: results,
          loading: false
        })
      }).catch(error => {
        this.setState({ error: true, loading: false })
      })
    }, 1500)
  }

  

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.loading
            ? <ActivityIndicator size='large' color='#6ca2f7' />
            : this.state.error
              ? <Text style={styles.error}>Ops... Algo deu errado</Text>
              : <PeopleList peoples={this.state.peoples} onPressItem={pageParams => {
                  this.props.navigation.navigate('PeopleDetail', pageParams)
                }} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'    
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 18
  }
})
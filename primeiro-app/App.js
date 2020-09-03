import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import PeoplePage from './src/pages/PeoplePage'
import PeopleDetailPage from './src/pages/PeopleDetailPage'

const AppNavigator = createStackNavigator({
  Main: {
    screen: PeoplePage
  },
  PeopleDetail: {
    screen: PeopleDetailPage,
    navigationOptions: ({ navigation }) => {
      const peopleName = navigation.state.params.people.name.first
      return ({
        title: peopleName,
        headerTitleStyle: {
          color: 'white',
          fontSize: 30
        }
      })
    }
  }
}, {
  defaultNavigationOptions: {
    title: 'Pessoas',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#c5c5c5'
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
      flexGrow: 1,
      textAlign: 'center'
    }
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer

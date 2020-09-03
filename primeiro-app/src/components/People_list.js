import React from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import PeopleList_Item from './PeopleList_Item'

export default props => {
    const { peoples, onPressItem } = props

    return (
        <FlatList
         style={styles.container}
         data={peoples}
         renderItem={({ item }) => (
             <PeopleList_Item 
                people={item}
                navigateToPeopleDetail={onPressItem}
             />
         )}
         keyExtractor={item => item.name.first} 
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e2f9ff'
    }
})

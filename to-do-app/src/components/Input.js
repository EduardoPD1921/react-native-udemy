import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default ({ onChangeText, value }) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            underlineColorAndroid="#000"
        />
    )
}

const styles = StyleSheet.create({
    input: {
        paddingBottom: 10
    }
})
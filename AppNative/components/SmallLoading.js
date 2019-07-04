import React from 'react'
import { View } from 'react-native'
import { usePromiseTracker } from 'react-promise-tracker'
import { ActivityIndicator } from 'react-native-paper'

const SmallLoading = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <View>
            {
                (promiseInProgress === true) ?
                    <ActivityIndicator size = 'small' color = 'royalblue'/>
                : null
            }
        </View>
    )
}

export default SmallLoading

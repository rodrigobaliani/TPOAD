import React from 'react'
import { View } from 'react-native'
import { usePromiseTracker } from 'react-promise-tracker'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <View>
            {
                (promiseInProgress === true) ?
                    <ActivityIndicator size = 'large' color = 'royalblue'/>
                : null
            }
        </View>
    )
}

export default Loading

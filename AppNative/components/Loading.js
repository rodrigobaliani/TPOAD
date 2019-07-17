import React from 'react'
import { View } from 'react-native'
import { usePromiseTracker } from 'react-promise-tracker'
import { ActivityIndicator } from 'react-native-paper'

const Loading = (props) => {
    const { promiseInProgress } = usePromiseTracker({area: props.area});
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

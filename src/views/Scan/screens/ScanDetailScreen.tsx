import { StyleSheet, Text, View } from "react-native"


const ScanDetailScreen:React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Scan Detail Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ScanDetailScreen;
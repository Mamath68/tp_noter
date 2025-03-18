import {StyleSheet} from "react-native";

export const RegisterScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 50
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        width: 250,
        textAlign: "justify",
        paddingStart: 10
    },
    label: {
        paddingVertical: 6,
        alignSelf: 'center',
    },
    timeInput: {
        width: 250,
        paddingStart: 10,
        marginHorizontal: 50
    },

});

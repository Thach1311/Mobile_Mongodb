import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Screen02 = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Both fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            const { token } = response.data; // Retrieve the token
       
            // Retrieve user information using the token
            const userResponse = await axios.get('http://localhost:5000/api/users/username/' + username, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userInfo = userResponse.data;

            // Navigate to ScreenMain with token and userInfo
            navigation.navigate("ScreenMain", { token, userInfo });
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default Screen02;
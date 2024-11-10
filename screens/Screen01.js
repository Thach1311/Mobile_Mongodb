import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Screen01 = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        axios.post('http://localhost:5000/api/register', { 
            _id: Date.now().toString(), // Sử dụng timestamp làm _id
            username, 
            email, 
            password 
        })
        .then(response => {
            Alert.alert('Success', 'Registration successful');
            navigation.navigate("Screen02"); // Chuyển hướng đến màn hình tiếp theo
        })
        .catch(error => {
            Alert.alert('Error', error.response?.data?.message || 'Registration failed');
        });
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
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
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

export default Screen01;
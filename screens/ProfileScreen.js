// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ route, navigation }) => {
    const { userId } = route.params; // User ID passed from the main screen
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`); // Adjust URL as needed
                setUserData(response.data);
                setUsername(response.data.username); // Initialize state for editing
                setEmail(response.data.email); // Initialize state for editing
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleLogout = () => {
         navigation.navigate('ScreenHome'); // Navigate to home or login screen
    }
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3000/users/${userId}`, {
                username,
                email,
                password: password || undefined // Send password only if provided
            });
            setUserData({ ...userData, username, email }); // Update local state
            setIsEditing(false);
            setPassword(''); // Clear password field
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleDelete =async () => {
        
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`);
            navigation.navigate('ScreenHome'); // Navigate to home or login screen
        } catch (error) {
            console.error("Error deleting account:", error);
        }
               
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!userData) {
        return <Text>No user data found</Text>;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={require("../assets/baiTH4/avt.jpg")} />
            {isEditing ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="New Password (leave blank to keep current)"
                        secureTextEntry
                    />
                    <Button title="Save" onPress={handleSave} />
                </>
            ) : (
                <>
                    <Text style={styles.name}>{userData.username}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                        <Text style={styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa', // Light background color
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderColor: '#007bff', // Add a border
        borderWidth: 2,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#343a40', // Dark text color
    },
    email: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    editButton: {
        backgroundColor: '#007bff', // Blue background for edit
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    editText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#dc3545', // Red background for logout
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#dc3545', // Red background for delete
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    deleteText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ route, navigation }) => {
    const { token, userInfo } = route.params; // Get token and userInfo from previous screen
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/username/${userInfo.username}`, {
                    headers: { Authorization: `Bearer ${token}` } // Send token in header
                });
                setUserData(response.data);
                setEmail(response.data.email); // Initialize email state
            } catch (error) {
                console.error("Error fetching user data:", error);
                Alert.alert('Error', 'Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token, userInfo]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users/${userData._id}`, {
                email,
                password: password || undefined // Only update password if provided
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData({ ...userData, email }); // Update userData email
            setIsEditing(false);
            setPassword('');
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error("Error updating user data:", error);
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userData._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Success', 'Account deleted successfully');
            navigation.navigate('ScreenHome'); // Navigate to home screen
        } catch (error) {
            console.error("Error deleting account:", error);
            Alert.alert('Error', 'Failed to delete account');
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
                    <Text style={styles.name}>{userData.username}</Text> {/* Display username without editing */}
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
                    <Text style={styles.name}>{userData.username}</Text> {/* Display username */}
                    <Text style={styles.email}>{userData.email}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                        <Text style={styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                </>
            )}
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
        backgroundColor: '#f8f9fa',
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
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
        backgroundColor: '#007bff',
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
    deleteButton: {
        backgroundColor: '#dc3545',
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
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function ScreenMain({ navigation, route }) {
    const { userInfo } = route.params; 
    const [dataLocation, setDataLocation] = useState([]);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [dataCategory, setDataCategory] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    console.log(userInfo.username)
    const fetchDataCategory = async () => {
        try {
            const response = await fetch('https://6723039a2108960b9cc665d9.mockapi.io/category');
            const json = await response.json();
            setDataCategory(json);
        } catch (error) {
            console.error("Error loading categories:", error);
        } finally {
            setLoadingCategory(false);
        }
    };

    useEffect(() => {
        fetchDataCategory();
    }, []);

    const fetchLocation = async () => {
        try {
            const response = await fetch('https://6723039a2108960b9cc665d9.mockapi.io/location');
            const json = await response.json();
            setDataLocation(json);
        } catch (error) {
            console.error("Error loading locations:", error);
        } finally {
            setLoadingLocation(false);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <View style={{ height: '100%' }}>
            <ScrollView style={{ width: '100%', height: '100%' }}>
                <View style={styles.header}>
                    <View style={styles.flexCustom}>
                        <Image style={styles.iconLogo} source={require("../assets/baiTH4/logoicon.png")} />
                        <View style={styles.search}>
                            <TextInput style={{ width: '80%' }} placeholder="Search here ..." />
                            <Image source={require("../assets/baiTH4/findicon.png")} />
                        </View>
                    </View>

                    <View style={[styles.flexCustom, { justifyContent: 'space-between', marginTop: 30 }]}>
                        <View style={styles.flexCustom}>
                            <Image style={styles.avatar} source={require("../assets/baiTH4/avt.jpg")} />
                            <View>
                                <Text style={{ fontWeight: "700", color: 'white' }}>Welcome!</Text>
                                <Text style={{ color: 'white' }}>{userInfo.username}</Text>
                            </View>
                        </View>
                        <Image style={{ height: 35, width: 35 }} source={require("../assets/baiTH4/ringicon.png")} />
                    </View>
                </View>

                <View style={styles.main}>
                    <View>
                        <View style={[styles.flexCustom, { justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }]}>
                            <Text style={{ fontWeight: '800' }}>Category</Text>
                            <Image style={{ height: 30, width: 30 }} source={require("../assets/baiTH4/3gach.png")} />
                        </View>

                        <View style={styles.listCategory}>
                            {dataCategory.map((category) => (
                                <View style={{ alignItems: 'center' }} key={category.id}>
                                    <Image style={styles.categoryItem} source={{ uri: category.image }} />
                                    <Text>{category.name}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={[styles.flexCustom, { justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }]}>
                            <Text style={{ fontWeight: '800' }}>Popular Destination</Text>
                            <Image style={{ height: 30, width: 30 }} source={require("../assets/baiTH4/3gach.png")} />
                        </View>

                        <View style={styles.flexCustom}>
                            {dataLocation.slice(0, 3).map((location) => (
                                <View key={location.id}>
                                    <Image style={styles.popularItem} source={{ uri: location.image }} />
                                </View>
                            ))}
                        </View>

                        <View style={[styles.flexCustom, { justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }]}>
                            <Text style={{ fontWeight: '800' }}>Recommended</Text>
                        </View>

                        <View style={styles.flexCustom}>
                            {dataLocation.slice(3, 5).map((location) => (
                                <View key={location.id}>
                                    <Image style={styles.commended} source={{ uri: location.image }} />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <Image style={{ height: 50, width: 50 }} source={require("../assets/baiTH4/homeicon.png")} />
                        <Text style={{ color: 'white' }}>Home</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Image style={{ height: 50, width: 50 }} source={require("../assets/baiTH4/exploreicon.png")} />
                        <Text style={{ color: 'white' }}>Explore</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Image style={{ height: 50, width: 50 }} source={require("../assets/baiTH4/searchicon.png")} />
                        <Text style={{ color: 'white' }}>Search</Text>
                    </View>
                    <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("ProfileScreen", { userInfo })}>
                        <Image style={{ height: 50, width: 50 }} source={require("../assets/baiTH4/profileicon.png")} />
                        <Text style={{ color: 'white' }}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    flexCustom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        height: 170,
        width: '100%',
        backgroundColor: '#5958b2',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    iconLogo: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        height: 35,
        width: 250,
        marginLeft: 10
    },
    avatar: {
        height: 53,
        width: 53,
        borderRadius: 26.5,
        marginRight: 15
    },
    main: {
        backgroundColor: 'white',
        padding: 40,
        alignItems: 'center',
    },
    listCategory: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    categoryItem: {
        height: 70,
        width: 70,
        marginHorizontal: 2
    },
    popularItem: {
        height: 110,
        width: 110,
        borderRadius: 10,
        marginHorizontal: 2
    },
    commended: {
        height: 100,
        width: 170,
        borderRadius: 10,
        marginHorizontal: 2
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#5958b2',
        height: 100,
        padding: 15
    },
    footerItem: {
        alignItems: 'center',
    }
});
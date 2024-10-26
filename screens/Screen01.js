import { useEffect, useState } from "react";
import { View,Text,Image, ScrollView, TextInput,StyleSheet } from "react-native";
export default function Screen01() {
   
    const [dataCategory,setDataCategory] = useState([])
    const [dataLocation,setDataLocation] = useState([])
    const [loadingCategory,setLoadingCategory] = useState(true)
    const [loadingLocation,setLoadingLocation] = useState(true)

    const fetchDataCategory = async () =>{
       try {
        const response = await fetch('https://6459bc8595624ceb21ee7bff.mockapi.io/projectt/category')
        const json = await response.json()
        setDataCategory(json)
       } catch (error) {
            console.error("Khong load duoc API")
       }
       finally{
            setLoadingCategory(false)
       }
    }

    useEffect(()=>{
        fetchDataCategory()
    },[])

    return (
        <View>
           <ScrollView style={{width:'100%',height:500}}>
                <View style={styles.header}>
                        <View style={styles.flexCustom}>
                            <Image style={styles.iconLogo} source={require("../assets/baiTH4/logoicon.png")}></Image>
                            <View style={styles.search}>
                                <TextInput style={{width:'80%'}} placeholder="Search here ..."></TextInput>
                                 <Image source={require("../assets/baiTH4/findicon.png")}></Image>
                            </View>
                        </View>

                        <View style={[styles.flexCustom,{justifyContent:'space-between',marginTop:30}]}>
                            <View style={styles.flexCustom}>
                                <Image style={styles.avatar} source={require("../assets/baiTH4/personicon.png")}></Image>
                                <View>
                                    <Text style={{fontWeight:"700",color:'white'}}>Wellcome !</Text>
                                    <Text  style={{color:'white'}}>Dona Stroupe</Text>
                                </View>
                            </View>
                            <Image style={{height:35,width:35}} source={require("../assets/baiTH4/ringicon.png")}></Image>

                        </View>
                </View>
           </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    flexCustom:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        height:170,
        width:'100%',
        backgroundColor:'#5958b2',
        padding:40,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    iconLogo:{
        height:50,
        width:50,
        borderRadius:'100%'
    },
    search:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:'5px',
        padding:5,
        height:35,
        width:250
    },
    avatar:{
        height:53,
        width:53,
        borderRadius:'100%',
        marginRight:15
    }

})
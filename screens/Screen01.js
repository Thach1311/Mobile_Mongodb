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


    const fetachLocation = async () =>{
        try {
         const response = await fetch('https://6459bc8595624ceb21ee7bff.mockapi.io/projectt/location')
         const json = await response.json()
         setDataLocation(json)
        } catch (error) {
             console.error("Khong load duoc API")
        }
        finally{
             setLoadingLocation(false)
        }
     }
 
     useEffect(()=>{
         fetachLocation()
     },[])

    return (
        <View style={{height:'100%'}}>
           <ScrollView style={{width:'100%',height:'100%'}}>
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

                <View style={styles.main}>
                    <View>
                        <View style={[styles.flexCustom,{justifyContent:'space-between',marginTop:20,marginBottom:20}]}>
                            <Text style={{fontWeight:'800'}}>Category</Text>
                            <Image style={{height:30,width:30}} source={require("../assets/baiTH4/3gach.png")}></Image>
                        </View>
    
                       <View style={styles.listCategory}>
                           {
                            dataCategory.map((category)=>(
                                <View style={{alignItems:'center'}}>
                                    <Image style={styles.categoryItem} source={{uri: category.image}}></Image>
                                    <Text>{category.name}</Text>
                                </View>
                            ))
                           }
                       </View>

                        <View style={[styles.flexCustom,{justifyContent:'space-between',marginTop:20,marginBottom:20}]}>
                            <Text style={{fontWeight:'800'}}>Popular Destination</Text>
                            <Image style={{height:30,width:30}} source={require("../assets/baiTH4/3gach.png")}></Image>
                        </View>

                        <View style={styles.flexCustom}>
                           {
                             dataLocation.slice(0,3).map((location)=>(
                                <View> 
                                      <Image style={styles.popularItem} source={{uri: location.image}}></Image>
                                 </View>
                             ))
                           }
                        </View>


                        <View style={[styles.flexCustom,{justifyContent:'space-between',marginTop:20,marginBottom:20}]}>
                            <Text style={{fontWeight:'800'}}>Recommended</Text>
                        </View>

                        <View style={styles.flexCustom}>
                           {
                             dataLocation.slice(3,5).map((location)=>(
                                <View> 
                                      <Image style={styles.commended} source={{uri: location.image}}></Image>
                                 </View>
                             ))
                           }
                        </View>
                    </View>
                </View>

               <View style={styles.footer}>
                 <View style={styles.footerItem}>
                    <Image style={{height:50,width:50}} source={require("../assets/baiTH4/homeicon.png")}></Image>
                    <Text style={{color:'white'}}>Home</Text>
                 </View>
                 <View style={styles.footerItem}>
                    <Image style={{height:50,width:50}} source={require("../assets/baiTH4/exploreicon.png")}></Image>
                    <Text style={{color:'white'}}>Explore</Text>
                 </View>
                 <View style={styles.footerItem}>
                    <Image style={{height:50,width:50}} source={require("../assets/baiTH4/searchicon.png")}></Image>
                    <Text style={{color:'white'}}>Search</Text>
                 </View>
                 <View style={styles.footerItem}>
                    <Image style={{height:50,width:50}} source={require("../assets/baiTH4/profileicon.png")}></Image>
                    <Text style={{color:'white'}}>Profile</Text>
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
        width:250,
        marginLeft:10
    },
    avatar:{
        height:53,
        width:53,
        borderRadius:'100%',
        marginRight:15
    },
    main:{
        backgroundColor:'white',
        padding:40,
        alignItems:'center',
    
    },
    listCategory:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        // width:'70%',
        justifyContent:'center'
    },
    categoryItem:{
        height:70,
        width:70,
        marginRight:2,
        marginLeft:2
    },
    popularItem:{
        height:110,
        width:110,
        borderRadius:'10px',
        marginRight:2,
        marginLeft:2
    },
    commended:{
        height:100,
        width:170,
        borderRadius:'10px',
        marginRight:2,
        marginLeft:2
    },
    footer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#5958b2',
        flex:10,
        height:100,
        width:'100%',
        padding:15
       
    },
    footerItem:{
        alignItems:'center',
        bottom:0,
        
    }
})
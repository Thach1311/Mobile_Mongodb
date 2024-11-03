import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ScreenHome({ navigation }) {
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Image style={{borderRadius:15,width:320}} source={require('../assets/baiTH4/homebackgroud.png')} />
      </View>

      <View style={{ marginLeft: 30 }}>
        <Text style={styles.boost}>Travel</Text>
        <Text style={styles.simplify}>Simplify tasks, boost productivity</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Screen01");
          }}
          style={styles.btnSignUp}
        >
          <Text style={{ color: "#fff" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("Screen02");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity style={styles.list}></TouchableOpacity>
        <TouchableOpacity style={styles.chose}></TouchableOpacity>
        <TouchableOpacity style={styles.list}></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boost: {
    fontWeight: "800",
    fontSize: 20,
  },
  simplify: {
    opacity: 0.5,
  },
  btnSignUp: {
    width: 330,
    height: 50,
    backgroundColor: "#53b8b9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  list: {
    borderRadius: 50, // 100% for circular borders should be set as half of the width/height
    width: 10,
    height: 10,
    margin: 3,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "blue",
  },
  chose: {
    borderRadius: 50,
    backgroundColor: "#53b8b9",
    width: 10,
    height: 10,
    margin: 3,
  },
});
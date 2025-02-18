import HorizontalListLoader from "@/components/horizontal-list-loader";
import OverlayContainer from "@/components/overlay-container";
import {View,Text, TouchableOpacity } from "react-native";

const Profile=()=>{
return(
     <OverlayContainer image={require("../../assets/images/comicbg.jpg")}>
     <View className="flex-1 px-8 py-16 gap-10">
     <Text style={{ fontFamily: "CaptainAmerica" }} className="text-white text-4xl text-center">Profile</Text>
        <View className="flex flex-1 items-center justify-center">
        <TouchableOpacity className="w-[70%]">
          <Text style={{ fontFamily: "CaptainAmerica" }} className="bg-marvelPrimary rounded-sm text-white text-center text-2xl px-4 py-4">Login with Google</Text>
         </TouchableOpacity>
        </View>
    </View>
   </OverlayContainer>
)
}
export default Profile;


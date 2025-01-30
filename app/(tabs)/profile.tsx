import HorizontalListLoader from "@/components/horizontal-list-loader";
import OverlayContainer from "@/components/overlay-container";
import ScreenHeader from "@/components/screen-header";
import { Skeleton } from "moti/skeleton";
import {useState, useEffect } from "react";
import {View,Text, TextInput } from "react-native";


const Profile=()=>{
return(
     <OverlayContainer image={require("../../assets/images/comicbg.jpg")}>
     <View className="flex-1 px-8 py-16 gap-10">
     <Text style={{ fontFamily: "CaptainAmerica" }} className="text-white text-4xl text-center">Search</Text>
         <View className="bg-secondaryBackground px-2 py-4 rounded-md">
         <TextInput
          className="text-white"
          placeholder="Search character..."
          style={{
            fontFamily: "CaptainAmerica",
            letterSpacing: 1.5,
          }}
          autoFocus
          onChangeText={()=>{}}
        />
         </View>
        <HorizontalListLoader/>
    </View>
   </OverlayContainer>
)
}
export default Profile;


import {View,Text,ScrollView, Pressable,Image,Modal, ActivityIndicator,ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { useQuery, useQueries } from '@tanstack/react-query';
import { getCharacterById, getComicById, getSeriesById, getStoryById } from "@/services/marvel-api";
import { Character, Comic, Series, Story } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ComicCard from "@/components/cards/media-card";
const StoryDetail=()=>{
const {id}=useLocalSearchParams();
const router=useRouter();

// if(isLoading || isComicsLoading || isSeriesLoading || isStoriesLoading){
//     return(
//         <View className="flex-1 items-center justify-center bg-primaryBackground">
//       <ActivityIndicator size="large" color="white"/>
//     </View>
//     )
// }



return(
    <ScrollView className="flex-1 bg-primaryBackground">
      <Text className="text-white text-xl">stories # {id}</Text>
      {/* <TouchableOpacity onPress={()=>router.back()} className="absolute top-4 left-4 z-10 p-1 rounded-full bg-black/60">
        <Ionicons name="chevron-back" color="white" size={20}/>
     </TouchableOpacity>
          <View className="py-8">
          <View className="w-full h-80 rounded-md">
        <Image source={{uri:imageURI}} className="w-full h-full rounded-md" resizeMode="contain"/>
        </View>
       <View className="px-4 py-8 gap-4">
       <Text style={{fontFamily:"CaptainAmerica"}} className="text-white text-4xl">
            {data?.name}
        </Text>
        <Text className="text-white text-lg tracking-wide">{data?.description ? data?.description:"Description not available."}</Text>
       </View>
       <View className="px-4 gap-4">
        <Text style={{fontFamily:"CaptainAmerica"}} className="text-3xl text-white">Comics</Text>
        <FlatList 
        horizontal
        data={comicsData}
        keyExtractor={({id})=>id.toString()}
        renderItem={({item})=><ComicCard data={item} type="comics"/>}
        ItemSeparatorComponent={()=><View className="w-4"></View>}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="space-between"
        />
       </View>
       <View className="px-4 gap-4 mt-8">
        <Text style={{fontFamily:"CaptainAmerica"}} className="text-3xl text-white">Series</Text>
        <FlatList 
        horizontal
        data={seriesData}
        keyExtractor={({id})=>id.toString()}
        renderItem={({item})=><ComicCard data={item} type="series"/>}
        ItemSeparatorComponent={()=><View className="w-4"></View>}
        showsHorizontalScrollIndicator={false}
        />
       </View>
       <View className="px-4 gap-4 mt-8">
        <Text style={{fontFamily:"CaptainAmerica"}} className="text-3xl text-white">Stories</Text>
        <FlatList 
        horizontal
        data={storiesData}
        keyExtractor={({id})=>id.toString()}
        renderItem={({item})=><ComicCard data={item} type="stories"/>}
        ItemSeparatorComponent={()=><View className="w-4"></View>}
        showsHorizontalScrollIndicator={false}
        />
       </View>
          </View> */}
    </ScrollView>
)
}
export default StoryDetail;
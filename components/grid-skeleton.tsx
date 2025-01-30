import { View,StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton as MotiSkeleton } from 'moti/skeleton';

// const GridSkeleton=(props:any)=>{
// return(
//    <View className="flex flex-row flex-wrap justify-between">
//     {
//         Array.from({length:8}).map((_,index)=><GridSkeletonItem key={index} height={244} width={160}/>)
//     }
//    </View>
// )
// }
// export default GridSkeleton;


export const Skeleton=({width,height}:{width:number,height:number})=>{
return(
    
    <MotiSkeleton transition={{type:"spring"}} width={"100%"} height={"100%"}  colors={["#24213B","#0C0926"]} />
  
)
}


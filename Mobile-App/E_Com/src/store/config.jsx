import { Platform } from "react-native";

//  for emulator 

export const BASE_URL = Platform.OS =='android'?'http://10.0.0.0:3000':'http://localhost:3000'
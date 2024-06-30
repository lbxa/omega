import { Text, TouchableOpacity, View } from "react-native";

import { Subtitle } from "../atoms";

interface Props {
  title: string;
  subtitle?: string;
  body: string;
  onPress?: () => void;
}

export const ContentCard = ({ title, subtitle, body, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-white mb-md pb-md rounded-lg">
        <View className="w-full h-[100px] mb-md bg-gray-200"></View>
        <View className="px-sm">
          <Subtitle title={title} />
          <Text>{subtitle}</Text>
          <Text>{body}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
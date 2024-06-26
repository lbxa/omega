import * as Haptics from "expo-haptics";
import type { ButtonProps, GestureResponderEvent } from "react-native";
import { Text, TouchableOpacity } from "react-native";

export const PrimaryButton = ({ title, onPress, ...props }: ButtonProps) => {
  const onPressHandler = async (e: GestureResponderEvent) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    onPress?.(e);
  };

  return (
    <TouchableOpacity
      className="bg-blue-200 rounded-md py-sm"
      onPress={onPressHandler}
      {...props}
    >
      <Text className="color-blue-800 text-center font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

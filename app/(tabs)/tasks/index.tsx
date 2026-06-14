import NewTasks from "@/app/tasks/newTasks";
import TasksList from "@/app/tasks/tasksList";
import { useTheme } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tasks() {
  const { theme } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["60%", "92%"], []);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = () => bottomSheetModalRef.current?.snapToIndex(1);
    const onHide = () => bottomSheetModalRef.current?.snapToIndex(0);

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
      />
    ),
    [],
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const content = (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="absolute bottom-6 right-6 z-10">
        <Pressable
          className="rounded-full p-5"
          onPress={handlePresentModalPress}
          style={{ backgroundColor: theme.primary }}
        >
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior="restore"
        backgroundStyle={{ backgroundColor: theme.surface }}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 10 }}
          keyboardShouldPersistTaps="handled"
        >
          <NewTasks />
        </BottomSheetScrollView>
      </BottomSheetModal>

      <TasksList />
    </SafeAreaView>
  );

  if (!theme.backgroundImage) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {content}
      </View>
    );
  }

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={theme.backgroundImage}
      resizeMode={theme.category === "texture" ? "repeat" : "cover"}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
        {content}
      </View>
    </ImageBackground>
  );
}

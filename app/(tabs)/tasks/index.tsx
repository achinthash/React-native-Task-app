import { Pressable, View } from "react-native";

// import { useEffect, useRef, useMemo, useState } from "react";

import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { Keyboard } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import NewTasks from "@/app/tasks/newTasks";

import TasksList from "@/app/tasks/tasksList";

import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tasks() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["55%", "60%"], []);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      pressBehavior="close" //  this enables click to close
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  );

  // Open the new task
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetModalRef.current?.snapToPosition(200); //custom position 200 px
    });

    return () => hide.remove();
  }, []);

  return (
    <SafeAreaView className="0 flex-1 " edges={["top"]}>
      {/*Floating new task button  */}
      <View className="z-10 right-6  bottom-6 absolute">
        <Pressable
          className="rounded-full bg-blue-500 p-5"
          onPress={handlePresentModalPress}
        >
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </View>

      {/* New task View BottomSheet  */}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={1}
        snapPoints={snapPoints}
        keyboardBehavior="extend"
        keyboardBlurBehavior="none" // 👈 Add this: Prevents keyboard from hiding on outside taps
        android_keyboardInputMode="adjustResize" // 👈 Helps Android handle the layout correctly
        backgroundStyle={{ backgroundColor: "#ffffff" }}
      >
        <BottomSheetView style={{ padding: 2 }}>
          <NewTasks />
        </BottomSheetView>
      </BottomSheetModal>

      {/* <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={1}
        snapPoints={snapPoints}
        keyboardBehavior="extend"
        // backdropComponent={({ style }) => (
        //   <View style={[style, { backgroundColor: "#3d3d3d98" }]} />
        // )}
        backgroundStyle={{
          backgroundColor: "#ffffff", // zinc-950 / white
        }}
        handleIndicatorStyle={{
          backgroundColor: "#000000", // zinc-700 / zinc-300
        }}
      >
        <BottomSheetView style={{ padding: 2 }}>
          <NewTasks />
        </BottomSheetView>
      </BottomSheetModal> */}

      <TasksList />

      {/* TASK LIST */}
      {/* <ScrollView className=" flex-1 bg-white p-2">
        <View className="mb-8">
          {tasks &&
            tasks.map((item) => (
              <View
                key={item.id}
                className="p-3 mb-2 border border-gray-200 rounded-lg"
              >
                <Text className="font-bold text-black">{item.title}</Text>
                <Text className="text-gray-600">{item.note}</Text>
              </View>
            ))}
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
}

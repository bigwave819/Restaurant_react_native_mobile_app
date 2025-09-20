// ProfileScreen.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <ScrollView
      className="flex-1 bg-gray-50 px-5 mb-20"
      contentContainerClassName="items-center pt-10"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center w-full mb-5">
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text className="text-lg font-semibold text-gray-800">Profile</Text>
        <Ionicons name="search-outline" size={24} color="#333" />
      </View>

      {/* Profile Image */}
      <View className="items-center mb-5 relative">
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          className="w-32 h-32 rounded-full"
        />
        <TouchableOpacity className="absolute bottom-0 right-0 bg-amber-500 p-2 rounded-full">
          <Ionicons name="create-outline" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Info Card */}
      <View className="bg-white rounded-xl p-5 shadow mb-6 w-full">
        <View className="flex-row items-center mb-4">
          <Ionicons name="person-outline" size={20} color="#f59e0b" />
          <Text className="ml-3 text-base text-gray-800">Adrian Hajdin</Text>
        </View>

        <View className="flex-row items-center mb-4">
          <Ionicons name="mail-outline" size={20} color="#f59e0b" />
          <Text className="ml-3 text-base text-gray-800">adrian@jsmastery.com</Text>
        </View>

        <View className="flex-row items-center mb-4">
          <Ionicons name="call-outline" size={20} color="#f59e0b" />
          <Text className="ml-3 text-base text-gray-800">+1 555 123 4567</Text>
        </View>

        <View className="flex-row items-center mb-4">
          <Ionicons name="home-outline" size={20} color="#f59e0b" />
          <Text className="ml-3 text-base text-gray-800 flex-1">
            123 Main Street, Springfield, IL 62704
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="business-outline" size={20} color="#f59e0b" />
          <Text className="ml-3 text-base text-gray-800 flex-1">
            221B Rose Street, Foodville, FL 12345
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity className="border border-amber-500 py-3 rounded-full items-center mb-3 w-full">
        <Text className="text-amber-500 font-semibold text-base">Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-red-400 py-3 rounded-full items-center w-full">
        <Text className="text-white font-semibold text-base">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

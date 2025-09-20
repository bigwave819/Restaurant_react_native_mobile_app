import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { images } from '@/constants'

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");

  // ✅ Sync query with params if they change
  useEffect(() => {
    if (params.query !== query) {
      setQuery(params.query || "");
    }
  }, [params.query]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query.trim()) {
      router.setParams({ query });
    }
  };

  return (
    <View className="searchbar">
      <TextInput 
        className="flex-1 p-5"
        placeholder="Search for pizza, burgers ..."
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="#A0A0A0"
      />
      <TouchableOpacity 
        className="pr-5"
        onPress={handleSubmit}
      >
        <Image 
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5d5f6d"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

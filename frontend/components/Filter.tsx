import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import cn from 'clsx'

type CategoryType = {
  _id: string;
  name: string;
  description: string;
}

interface FilterProps {
  categories: CategoryType[]
}

type FilterItem = CategoryType | { _id: string; name: string };

const Filter = ({ categories }: FilterProps) => {
  const searchParams = useLocalSearchParams()
  const [active, setActive] = useState(searchParams.category || '')

  const handlePress = (_id: string) => {
    setActive(_id)

    if (_id === 'all') {
      router.setParams({ category: undefined })
    } else {
      router.setParams({ category: _id })
    }
  };

  const filterData: FilterItem[] = [
    { _id: "all", name: "All" },
    ...categories
  ]

  return (
    <FlatList 
      data={filterData}
      keyExtractor={(item) => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-x-2 pb-2'
      renderItem={({ item }) => (
        <TouchableOpacity 
          className={cn('filter', active === item._id ? 'bg-amber-500' : 'bg-white')}
          style={Platform.OS === 'android' ? { elevation: 5, shadowColor: "#878787" } : {}}
          onPress={() => handlePress(item._id)}
        >
          <Text className={cn('body-medium', active === item._id ? 'text-white' : 'text-gray-200')}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default Filter
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import CartButton from "@/components/cartButton";
import cn from "clsx";
import { fetchMenu } from "@/lib/menuApis";
import MenuCard from "@/components/menuCard";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import { fetchCategory } from "@/lib/categoryApis";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const [menu, setMenu] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams<{ query?: string }>();

  const searchParams = useLocalSearchParams();
  const activeCategory = searchParams.category || "all"; 

  // fetch menu
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMenu();
        console.log('API Response data:', data);
        console.log('First menu item:', data[0]);
        console.log('First item ID:', data[0]?._id);
        setMenu(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // fetch categories
  useEffect(() => {
    (async () => {
      try {
        const categoryData = await fetchCategory();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  const filteredMenu = menu.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      (item.category && item.category._id === activeCategory);

    const matchesSearch =
      !params.query ||
      item.name.toLowerCase().includes(params.query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  console.log('Filtered menu count:', filteredMenu.length);
  console.log('First filtered item:', filteredMenu[0]);

  return (
    <SafeAreaView>
      <FlatList
        data={filteredMenu}
        renderItem={({ item, index }) => {
          const isFirstColRightItem = index % 2 === 0;
          
          // Add validation for the item
          if (!item._id) {
            console.warn('Menu item missing _id:', item);
            return (
              <View className={cn("flex-1 max-w-[48%]", !isFirstColRightItem ? "mt-10" : "mt-0")}>
                <Text className="text-red-500">Invalid item: Missing ID</Text>
              </View>
            );
          }

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstColRightItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard
                id={item._id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item._id || `item-${Math.random()}`}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">Search</Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find Your favourite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <SearchBar />
            <Filter categories={categories} />
          </View>
        )}
        ListEmptyComponent={() => !loading && (
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-gray-500 text-lg">No items found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
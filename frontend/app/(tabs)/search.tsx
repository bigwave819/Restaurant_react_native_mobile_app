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
      const data = await fetchMenu();
      setMenu(data);
      setLoading(false);
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

  return (
    <SafeAreaView>
      <FlatList
        data={filteredMenu} // 👈 use filteredMenu
        renderItem={({ item, index }) => {
          const isFirstColRightItem = index % 2 === 0;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstColRightItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item._id || item.$id}
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
        ListEmptyComponent={() => !loading && <Text>No Result</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;

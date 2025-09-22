import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCartStore } from '@/store/cart.store';

type Category = {
    _id: string;
    name: string;
    description: string;
};

type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    calories: number;
    protein: number;
    category: Category;
    imageUrl: string;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MenuDetailsPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { addItem } = useCartStore();

    const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                console.log('Starting fetch for ID:', id);
                const response = await fetch(`http://10.110.14.76:7000/api/menu/${id}`);
                const data = await response.json();
                // Check if data has the properties we expect (direct menu item response)
                if (data && data._id && data.name) {
                    setMenuItem(data);
                } else if (data.success && data.data) {
                    // If using the new format
                    setMenuItem(data.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenuItem();
    }, [id]);

    const handleAddToCart = () => {
        if (!menuItem) return;
        addItem({
            menuItemId: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            imageUrl: menuItem.imageUrl,
        });
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#FF6347" />
            </View>
        );
    }

    if (!menuItem) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50 px-4">
                <Text className="text-center text-xl font-bold text-gray-700">Menu item not found</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-50">
            {/* Image */}
            <Image
                source={{ uri: menuItem.imageUrl }}
                className="w-full"
                style={{ height: SCREEN_HEIGHT / 2 }}
                resizeMode="cover"
            />

            <View className="px-6 mt-6">
                {/* Name */}
                <Text className="text-3xl font-extrabold text-gray-900 mb-2">{menuItem?.name}</Text>

                {/* Category */}
                <Text className="text-primary text-base font-semibold mb-4">
                    {menuItem.category?.name || "Unknown Category"}
                </Text>

                {/* Stats */}
                <View className="flex-row justify-between bg-white p-4 rounded-2xl shadow-lg mb-4">
                    <View className="items-center">
                        <Text className="text-gray-800 font-semibold">Calories</Text>
                        <Text className="text-gray-600 text-lg mt-1">{menuItem?.calories} kcal</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-gray-800 font-semibold">Protein</Text>
                        <Text className="text-gray-600 text-lg mt-1">{menuItem?.protein} g</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-gray-800 font-semibold">Price</Text>
                        <Text className="text-primary font-bold text-lg mt-1">$ {menuItem?.price}</Text>
                    </View>
                </View>

                {/* Description */}
                <Text className="text-gray-600 text-base mb-6">{menuItem?.description}</Text>

                {/* Add to Cart */}
                <TouchableOpacity
                    onPress={handleAddToCart}
                    className="bg-primary py-4 rounded-full items-center mb-8 shadow-lg"
                    style={
                        Platform.OS === 'android'
                            ? { elevation: 5 }
                            : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 5 }
                    }
                >
                    <Text className="text-white text-xl font-bold">Add To Cart +</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MenuDetailsPage;

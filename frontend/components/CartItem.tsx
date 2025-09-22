import { useCartStore } from "@/store/cart.store";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {images} from "@/constants";

export interface CartItemType {
    id: string; // Unique cart item ID
    menuItemId: string; // Original menu item ID
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();

    return (
        <View className="flex-row justify-between items-center p-4 bg-gray-50 rounded-xl mb-3">
            <View className="flex-row items-center gap-3">
                <View className="w-20 h-20 justify-center items-center">
                    <Image
                        source={{ uri: item.imageUrl }}
                        className="w-4/5 h-4/5 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View>
                    <Text className="text-base font-bold text-dark-100">{item.name}</Text>
                    <Text className="text-sm font-bold text-primary mt-1">
                        ${item.price}
                    </Text>

                    <View className="flex-row items-center gap-4 mt-2">
                        <TouchableOpacity onPress={() => decreaseQty(item.id)} className="w-8 h-8 justify-center items-center bg-gray-200 rounded-full">
                            <Text className="text-lg font-bold">-</Text>
                        </TouchableOpacity>
                        <Text className="text-base font-bold text-dark-100 min-w-8 text-center">{item.quantity}</Text>
                        <TouchableOpacity onPress={() => increaseQty(item.id)} className="w-8 h-8 justify-center items-center bg-gray-200 rounded-full">
                            <Text className="text-lg font-bold">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => removeItem(item.id)}
                className="w-10 h-10 justify-center items-center bg-red-50 rounded-full"
            >
                <Image source={images.trash} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;
import { useCartStore } from '@/store/cart.store';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, Image, Platform, GestureResponderEvent } from 'react-native';

type MenuCardProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const MenuCard = ({ id, name, price, imageUrl }: MenuCardProps) => {
  const { addItem } = useCartStore();

  // Add validation to ensure ID exists
  if (!id) {
    console.error('MenuCard: ID is undefined or empty');
    return null; // or return a fallback component
  }

  const handleAddToCart = (e: GestureResponderEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking "Add To Cart"
    addItem({
      menuItemId: id,
      name,
      price,
      imageUrl,
    });
  };

  return (
    <Link href={`/menu/${id}`} asChild>
      <TouchableOpacity
        className="bg-white rounded-2xl p-4 m-2 items-center pt-16"
        style={
          Platform.OS === 'android'
            ? { elevation: 10, shadowColor: '#878787' }
            : {
                shadowColor: '#878787',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }
        }
      >
        <Image
          source={{ uri: imageUrl }}
          className="w-24 h-24 absolute -top-10"
          resizeMode="contain"
        />
        <Text
          className="text-center text-base font-bold text-dark-100 mb-2"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-sm text-gray-200 mb-4">From $ {price}</Text>
        <TouchableOpacity
          onPress={handleAddToCart}
          className="bg-primary px-4 py-2 rounded-full"
        >
          <Text className="text-sm font-bold text-white">Add To Cart +</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

export default MenuCard;

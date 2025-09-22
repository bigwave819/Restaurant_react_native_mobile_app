import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { useCartStore } from '@/store/cart.store'

const CartButton = () => {
    const { getTotalItems } = useCartStore()

    const totalItems = getTotalItems()
  return (
   <TouchableOpacity className='relative p-2 bg-gray-100 rounded-lg' onPress={() => {}}>
    <Image source={images.bag} className='w-5 h-5' resizeMode='contain'/>
    { totalItems > 0 && (
        <View className='absolute -top-2 -right-2 bg-red-500 rounded-full min-w-5 h-5 justify-center items-center'>
            <Text className='text-xs font-bold text-white'>{totalItems}</Text>
        </View>
    ) }
   </TouchableOpacity>
  )
}

export default CartButton
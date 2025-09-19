

import { View, Text, TouchableOpacity, Image } from 'react-native'


type MenuCardProps = {
  name: string;
  price: number;
  imageUrl: string;
};

const menuCard = ({ name, price, imageUrl }: MenuCardProps) => {
  return (
    <TouchableOpacity className='menu-card'>
        <Image 
            source={{ uri: imageUrl }} 
            className='size-32 absolute -top-10' 
            resizeMode='contain'
        />
        <Text 
            className='text-center base-bold text-dark-100 mb-2' 
            numberOfLines={1}
        >{name}</Text>
        <Text
            className='body-regular text-gray-200 mb-4'
        >From $ {price}</Text>
        <TouchableOpacity>
            <Text className='paragraph-bold text-primary'>Add To Cart +</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default menuCard
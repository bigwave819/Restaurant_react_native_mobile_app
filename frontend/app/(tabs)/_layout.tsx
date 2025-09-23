import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TabBarIconProps } from "@/types"
import { images } from '@/constants'
import cn from "clsx"
import "../globals.css"

/**
 * Custom Tab Bar Icon Component
 * - Displays an icon and a title for each tab
 * - Changes color and text style based on focus state
 */
export const TabBarIcon = ({ focused, icon, title } : TabBarIconProps) => (
    <View className='tab-icon'>
        {/* Icon with conditional tint color when focused */}
        <Image 
            source={icon} 
            className="size-7" 
            resizeMode='contain' 
            tintColor={focused ? '#FE8C00' : '5D5F6D'} 
        />
        {/* Title with conditional text color when focused */}
        <Text 
            className={cn(
                `text-sm font-bold`, 
                focused ? 'text-primary' : 'text-gray-200'
            )}
        >
            {title}
        </Text>
    </View>
)

/**
 * Tab Layout Configuration
 * - Provides bottom navigation using expo-router Tabs
 * - Applies custom styling to the tab bar
 */
const TabLayout = () => {
  return (
    <Tabs 
        screenOptions={{
            // Hide the header for all screens
            headerShown: false,
            // Hide default tab labels since we use custom ones
            tabBarShowLabel: false,
            // Custom tab bar styling for a rounded floating effect
            tabBarStyle: {
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                marginHorizontal: 20,
                height: 80,
                position: 'absolute',
                bottom: 50,
                backgroundColor: 'white',
                // Shadow styling for elevation effect
                shadowColor: '#1a1a1a',
                shadowOffset: { width:0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5
            }
        }}
    >
        {/* Home Tab */}
        <Tabs.Screen 
            name='index'
            options={{
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} icon={images.home} title='Home'/>
                )
            }}
        />

        {/* Search Tab */}
        <Tabs.Screen 
            name='search'
            options={{
                title: 'Search',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} icon={images.search} title='Search'/>
                )
            }}
        />

        {/* Cart Tab */}
        <Tabs.Screen 
            name='cart'
            options={{
                title: 'Cart',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} icon={images.home} title='Cart'/>
                )
            }}
        />

        {/* Profile Tab */}
        <Tabs.Screen 
            name='profile'
            options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon focused={focused} icon={images.user} title='Profile'/>
                )
            }}
        />
    </Tabs>
  )
}

export default TabLayout

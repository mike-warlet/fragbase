import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import MessagesScreen from './screens/Messages';
import ProfileScreen from './screens/Profile';
import PerfumeDetailScreen from './screens/PerfumeDetail';
import CreateReviewScreen from './screens/CreateReview';
import CreatePostScreen from './screens/CreatePost';
import ChatScreen from './screens/Chat';
import EditProfileScreen from './screens/EditProfile';
import UserProfileScreen from './screens/UserProfile';
import CollectionsScreen from './screens/Collections';
import CollectionDetailScreen from './screens/CollectionDetail';
import CreateCollectionScreen from './screens/CreateCollection';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8b4513',
        tabBarInactiveTintColor: '#999',
        headerShown: true,
      }}
    >
      <Tab.Screen 
        name="Feed" 
        component={HomeScreen}
        options={{ 
          title: 'Feed',
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ 
          title: 'Buscar',
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🔍</Text>
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{ 
          title: 'Mensagens',
          tabBarLabel: 'Mensagens',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💬</Text>
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PerfumeDetail" 
        component={PerfumeDetailScreen}
        options={{ title: 'Detalhes do Perfume' }}
      />
      <Stack.Screen 
        name="CreateReview" 
        component={CreateReviewScreen}
        options={{ title: 'Criar Review' }}
      />
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePostScreen}
        options={{ title: 'Novo Post' }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={({ route }) => ({ 
          title: route.params?.userName || 'Chat'
        })}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Editar Perfil' }}
      />
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{ title: 'Perfil do Usuário' }}
      />
      <Stack.Screen 
        name="Collections" 
        component={CollectionsScreen}
        options={{ title: 'Coleções' }}
      />
      <Stack.Screen 
        name="CollectionDetail" 
        component={CollectionDetailScreen}
        options={{ title: 'Coleção' }}
      />
      <Stack.Screen 
        name="CreateCollection" 
        component={CreateCollectionScreen}
        options={{ title: 'Nova Coleção' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // TODO: Add splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

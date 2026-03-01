import React, { useState, useEffect, useCallback } from 'react';
import { Text, ActivityIndicator, View, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './AuthContext';
import { apiCall } from './config';
import ErrorBoundary from './components/ErrorBoundary';
import { colors } from './theme';

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
import MyCollectionScreen from './screens/MyCollection';
import WishlistScreen from './screens/Wishlist';
import AddFragranceScreen from './screens/AddFragrance';
import NotificationsScreen from './screens/Notifications';
import SOTDPickerScreen from './screens/SOTDPicker';
import CompareScreen from './screens/Compare';
import FragranceDiaryScreen from './screens/FragranceDiary';
import ChallengesScreen from './screens/Challenges';
import ChallengeDetailScreen from './screens/ChallengeDetail';
import TasteTwinsScreen from './screens/TasteTwins';
import ScentQuizScreen from './screens/ScentQuiz';
import RecommendationsScreen from './screens/Recommendations';
import ExploreScreen from './screens/Explore';
import BadgesScreen from './screens/Badges';
import LeaderboardScreen from './screens/Leaderboard';
import MarketplaceScreen from './screens/Marketplace';
import CreateListingScreen from './screens/CreateListing';
import ListingDetailScreen from './screens/ListingDetail';
import BarcodeScannerScreen from './screens/BarcodeScanner';
import BatchCheckScreen from './screens/BatchCheck';
import PerfumerProfileScreen from './screens/PerfumerProfile';
import CollectionAnalyticsScreen from './screens/CollectionAnalytics';
import ScentCompassScreen from './screens/ScentCompass';
import TasteProfileScreen from './screens/TasteProfile';
import IngredientDetailScreen from './screens/IngredientDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
  },
};

const screenOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: { fontWeight: '600' },
};

function MainTabs() {
  const { isLoggedIn } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const [msgData, notifData] = await Promise.all([
        apiCall('/api/messages/conversations').catch(() => ({ conversations: [] })),
        apiCall('/api/notifications?limit=20').catch(() => ({ notifications: [] })),
      ]);
      const convos = msgData.conversations || [];
      setUnreadMessages(convos.reduce((sum, c) => sum + (c.unread_count || 0), 0));
      const notifs = notifData.notifications || [];
      const unreadN = notifs.filter(n => !n.is_read).length;
      setUnreadNotifications(unreadN);
    } catch (e) {}
  }, [isLoggedIn]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        headerShown: true,
        ...screenOptions,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Feed',
          tabBarLabel: 'Feed',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text>,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 12, marginRight: 16 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                <Text style={{ fontSize: 22 }}>🔮</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <View>
                  <Text style={{ fontSize: 22 }}>🔔</Text>
                  {unreadNotifications > 0 && (
                    <View style={{
                      position: 'absolute', top: -4, right: -6,
                      backgroundColor: colors.error, borderRadius: 8,
                      minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ),
        })}
        listeners={{ focus: fetchUnreadCount }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Buscar',
          tabBarLabel: 'Buscar',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🔍</Text>,
        }}
      />
      <Tab.Screen
        name="MyCollection"
        component={MyCollectionScreen}
        options={{
          title: 'Coleção',
          tabBarLabel: 'Coleção',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📦</Text>,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Mensagens',
          tabBarLabel: 'Mensagens',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>💬</Text>,
          tabBarBadge: unreadMessages > 0 ? unreadMessages : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.error, fontSize: 10 },
        }}
        listeners={{ focus: fetchUnreadCount }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
          title: route.params?.userName || 'Chat',
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
        options={{ title: 'Perfil do Utilizador' }}
      />
      <Stack.Screen
        name="Collections"
        component={CollectionsScreen}
        options={{ title: 'Colecoes' }}
      />
      <Stack.Screen
        name="CollectionDetail"
        component={CollectionDetailScreen}
        options={{ title: 'Colecao' }}
      />
      <Stack.Screen
        name="CreateCollection"
        component={CreateCollectionScreen}
        options={{ title: 'Nova Colecao' }}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ title: 'Wishlist' }}
      />
      <Stack.Screen
        name="AddFragrance"
        component={AddFragranceScreen}
        options={{ title: 'Adicionar Perfume' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notificações' }}
      />
      <Stack.Screen
        name="SOTDPicker"
        component={SOTDPickerScreen}
        options={{ title: 'Perfume do Dia' }}
      />
      <Stack.Screen
        name="Compare"
        component={CompareScreen}
        options={{ title: 'Comparar Perfumes' }}
      />
      <Stack.Screen
        name="FragranceDiary"
        component={FragranceDiaryScreen}
        options={{ title: 'Diario de Fragancias' }}
      />
      <Stack.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{ title: 'Desafios' }}
      />
      <Stack.Screen
        name="ChallengeDetail"
        component={ChallengeDetailScreen}
        options={{ title: 'Desafio' }}
      />
      <Stack.Screen
        name="TasteTwins"
        component={TasteTwinsScreen}
        options={{ title: 'Taste Twins' }}
      />
      <Stack.Screen
        name="ScentQuiz"
        component={ScentQuizScreen}
        options={{ title: 'Quiz Olfativo' }}
      />
      <Stack.Screen
        name="Recommendations"
        component={RecommendationsScreen}
        options={{ title: 'Recomendacoes' }}
      />
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ title: 'Descobrir' }}
      />
      <Stack.Screen
        name="Badges"
        component={BadgesScreen}
        options={{ title: 'Badges & XP' }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{ title: 'Leaderboard' }}
      />
      <Stack.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{ title: 'Marketplace' }}
      />
      <Stack.Screen
        name="CreateListing"
        component={CreateListingScreen}
        options={{ title: 'Novo Anúncio' }}
      />
      <Stack.Screen
        name="ListingDetail"
        component={ListingDetailScreen}
        options={{ title: 'Anúncio' }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScannerScreen}
        options={{ title: 'Scanner' }}
      />
      <Stack.Screen
        name="BatchCheck"
        component={BatchCheckScreen}
        options={{ title: 'Batch Code' }}
      />
      <Stack.Screen
        name="PerfumerProfile"
        component={PerfumerProfileScreen}
        options={{ title: 'Perfumista' }}
      />
      <Stack.Screen
        name="CollectionAnalytics"
        component={CollectionAnalyticsScreen}
        options={{ title: 'Estatisticas' }}
      />
      <Stack.Screen
        name="ScentCompass"
        component={ScentCompassScreen}
        options={{ title: 'Bussola Olfativa' }}
      />
      <Stack.Screen
        name="TasteProfile"
        component={TasteProfileScreen}
        options={{ title: 'Perfil Olfativo' }}
      />
      <Stack.Screen
        name="IngredientDetail"
        component={IngredientDetailScreen}
        options={{ title: 'Ingredientes' }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const linking = {
    prefixes: ['fragbase://', 'https://fragbase.app'],
    config: {
      screens: {
        Main: {
          screens: {
            MainTabs: { screens: { Feed: 'feed', Search: 'search' } },
            PerfumeDetail: 'perfume/:perfumeId',
            UserProfile: 'user/:userId',
          }
        },
      }
    }
  };

  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
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

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ErrorBoundary>
  );
}

import React from 'react';
import { Text, ActivityIndicator, View, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './AuthContext';
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
        options={{
          title: 'Feed',
          tabBarLabel: 'Feed',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
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
        }}
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

  return (
    <NavigationContainer theme={navTheme}>
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

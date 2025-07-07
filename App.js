// App.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Tabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name = "Home" component = {HomeScreen}/>
      <Tab.Screen name = "Search" component = {SearchScreen}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === 'Home' ? 'home' : 'images';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })} */}

        <Drawer.Screen name = "Main" component={Tabs}/>
        <Drawer.Navigator name = "About" component = {AboutScreen}/>

        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

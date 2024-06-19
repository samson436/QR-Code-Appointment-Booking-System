import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import registerNNPushToken from 'native-notify';
import { registerIndieID } from 'native-notify';

//Navigation Components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import TabOne from './screens/Tabs/TabOne';
import TabTwo from './screens/Tabs/TabTwo';
import TabThree from './screens/Tabs/TabThree';
import TabFour from './screens/Tabs/TabFour';

//firebase
import { auth, db } from './firebase-config';
import { onAuthStateChanged } from "firebase/auth";

//Authentication Contexts
import { useAuth } from './context-stores/authcontext';
import AuthContextProvider from './context-stores/authcontext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setisLoading] = useState(true);
  registerNNPushToken(4977, 'yNMlamw5tAotMPmDieqa1W');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        registerIndieID(`${user.uid}`, 4977, 'yNMlamw5tAotMPmDieqa1W');
      }
      setisLoading(false);
    });

    return () => {
      unsubscribe();
    }
  }, [])

  if (isLoading) {
    return (
      //SplashScreen displayed when loading.
      <SplashScreen />
    )
  }


  return(
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        {
          !user ? (
            <>
              <Stack.Screen name="Loginpage" component={LoginScreen}></Stack.Screen>
              <Stack.Screen name="Registerpage" component={RegisterScreen}></Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Homepage" component={TabNavigator}></Stack.Screen> 
          )
        }
      </Stack.Navigator>
  );
}

const TabNavigator = () => {
  const { user_data } = useAuth();

  return(
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
     
    }}
    >
      {
        user_data && user_data.role === 'patient' ? (
          <>
          <Tab.Screen name="Home" component={TabOne} options={{
           tabBarshowLabel: "false",
           tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
           ),
          tabBarStyle:[{
          position:'absolute',
          bottom:0,
          left:0,
          right:0,
          elevation:0,
          backgroundColor:'#ffffff',
          borderRadius:8,
          height:70,
         ...styles.shadow,
          },
          ]
      }}/>
      <Tab.Screen name="Add" component={TabTwo} options={{
            tabBarshowLabel: "false",
            tabBarIcon: ({color, size}) => (
            <Ionicons name="add" size={size} color={color} />
            
            ),
          tabBarStyle:[{
          position:'absolute',
          bottom:0,
          left:0,
          right:0,
          elevation:0,
          backgroundColor:'#ffffff',
          borderRadius:8,
          height:70,
          ...styles.shadow,
          },
          ]
      }}/>
    <Tab.Screen name="Notification" component={TabThree} options={{
           tabBarshowLabel: "false",
           tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" size={size} color={color} />
           ),
          tabBarStyle:[{
          position:'absolute',
          bottom:0,
          left:0,
          right:0,
          elevation:0,
          backgroundColor:'#ffffff',
          borderRadius:8,
          height:70,
         ...styles.shadow,
          },
          ]
      }}/>
          </>
        ) : (
          <>
          <Tab.Screen name="Home" component={TabFour} options={{
            tabBarshowLabel: "false",
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarStyle:[{
            position:'absolute',
            bottom:0,
            left:0,
            right:0,
            elevation:0,
            backgroundColor:'#ffffff',
            borderRadius:8,
            height:70,
          ...styles.shadow,
            },
            ]
        }}/>
        <Tab.Screen name="Add" component={TabThree} options={{
              tabBarshowLabel: "false",
              tabBarIcon: ({color, size}) => (
              <Ionicons name="add" size={size} color={color} />
              
              ),
            tabBarStyle:[{
            position:'absolute',
            bottom:0,
            left:0,
            right:0,
            elevation:0,
            backgroundColor:'#ffffff',
            borderRadius:8,
            height:70,
            ...styles.shadow,
            },
            ]
        }}/>
          </>
        )
      }
    </Tab.Navigator>
  );
}

export default function App() {
  return (
   
   <AuthContextProvider>
      <NavigationContainer>
          <Drawer.Navigator initialRouteName = "Home"   screenOptions={{
          headerShown: false,
          ShowLabel: false,
          
          
          }}>
            <Drawer.Screen name="Home" component={HomeStackNavigator} options={{ShowLabel: false}}></Drawer.Screen>
          
          </Drawer.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  shadow:{
  shadowColor:'#7F5DF0',
  shadowOffset:{
  width:0,
  height:10,
  },
  shadowOpacity:0.25,
  shadowRadius:3.5,
  elevation:5,

  }
});


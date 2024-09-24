import { Button, Center, Flex, Heading, Image, Text } from "native-base";
import Screen from "../../components/Screen";

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TempScreen({ navigation }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfilePhoto = async () => {
    try {
      const cachedUrl = await AsyncStorage.getItem('profile_photo_url');
      if (cachedUrl) {
        console.log("cachedUrl: ", cachedUrl);
        setImageUrl(cachedUrl);
      } else {
        const response = await fetch('https://be76-46-2-235-34.ngrok-free.app/profile/3/photo-url');
        const data = await response.json();
        setImageUrl(data.profile_photo_url);
        await AsyncStorage.setItem('profile_photo_url', data.profile_photo_url);
      }
      setError(null);  // Clear any previous errors
    } catch (e) {
      setError('Failed to load profile photo');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = async () => {
    try {
      // URL expired or failed to load, request a new pre-signed URL
      const response = await fetch('https://your-backend-api/refresh-presigned-url');
      if (!response.ok) {
        throw new Error('Failed to fetch new URL');
      }
      const data = await response.json();
      setImageUrl(data.profile_photo_url);
      await AsyncStorage.setItem('profile_photo_url', data.profile_photo_url);
      setError(null);  // Clear any errors if successful
    } catch (e) {
      // Handle the failure of fetching a new URL
      setError('Failed to refresh the profile photo');
    }
  };

  const removeItemValue = async (key) => {
      try {
          await AsyncStorage.removeItem(key);
          return true;
      }
      catch(exception) {
          return false;
      }
  }

  useEffect(() => {
    removeItemValue('profile_photo_url');
    fetchProfilePhoto();
  }, []);

  
  const pressHandler = () => {
    console.log("Fetching profile photo...")
    fetchProfilePhoto();
  };
  
  if (loading) {
    return(
      <Screen>
        <Flex direction="column" mb="2.5" mt="20">
          <Center mb="7">
            <Text>Loading...</Text>
          </Center>
        </Flex>
      </Screen>
    );
  }

  return (
    <Screen>
      <Flex direction="column" mb="2.5" mt="20">
        <Center mb="7">
          
        {error ? (
          <Center>
            <Text>{error}</Text>
            {/* Retry button to manually refresh */}
            <Button m="7" variant="primary" onPress={handleImageError}>
              Retry
            </Button>
          </Center>
        ) : (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }}
            onError={handleImageError}  // Handle image load failure
            alt="bisey"
          />
        )}
        </Center>
      </Flex>
    </Screen>
  );
}

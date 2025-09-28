
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAppContext } from "@/contexts/AppContext";

export default function HomeScreen() {
  const { selectedRole, selectedReligion } = useAppContext();

  useEffect(() => {
    console.log('HomeScreen - selectedRole:', selectedRole, 'selectedReligion:', selectedReligion);
    
    if (!selectedRole) {
      router.replace('/role-selection');
    } else if (!selectedReligion) {
      router.replace('/religion-selection');
    } else {
      router.replace('/(tabs)');
    }
  }, [selectedRole, selectedReligion]);

  return (
    <View style={styles.container}>
      {/* Loading state while redirecting */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

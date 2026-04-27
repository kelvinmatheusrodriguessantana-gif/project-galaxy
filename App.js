import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Avatar from './Avatar'; // Assuming Avatar is a separate component for the 3D avatar
import Voice from '@react-native-community/voice'; // Library for voice input

const App = () => {
  const [voiceInput, setVoiceInput] = useState('');
  const [gender, setGender] = useState('');
  const [emotion, setEmotion] = useState('');

  useEffect(() => {
    // Start voice recognition on mount
    Voice.onSpeechResults = (event) => {
      setVoiceInput(event.value[0]);
    };
    Voice.start('en-US');

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const detectEmotion = () => {
    // Ideally, integrate an emotion detection API here
    // For now, setting a dummy emotion based on voiceInput length
    if (voiceInput.length > 0) {
      setEmotion('Happy'); // Dummy logic for emotion detection
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Select your gender:</Text>
      <Button title="Male" onPress={() => handleGenderSelection('Male')} />
      <Button title="Female" onPress={() => handleGenderSelection('Female')} />

      <Text>Voice Input: {voiceInput}</Text>
      <Button title="Detect Emotion" onPress={detectEmotion} />
      <Text>Detected Emotion: {emotion}</Text>

      <Avatar gender={gender} emotion={emotion} />
      <TextInput placeholder="Type here..." value={voiceInput} onChangeText={setVoiceInput} />
    </View>
  );
};

export default App;
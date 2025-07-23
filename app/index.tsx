import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ApostasProvider, useApostas } from '../context/ApostaContext';
import CriarApostaModal from '@/modals/criarApostaModal';

export default function Home() {
  const { state } = useApostas();

  return (
    <View>
        <TouchableOpacity onPress={() => {CriarApostaModal}}>
            <Text>Criar Aposta</Text>
        </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  apostaItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  apostaText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  apostaSubtext: {
    fontSize: 14,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});

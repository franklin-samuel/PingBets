import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useApostas } from '../context/ApostaContext';
import CriarApostaModal from '@/modals/criarApostaModal';
import ApostadorModal from '@/modals/apostadorModal';

export default function Home() {
  const { state } = useApostas();

  const [modalCriarVisible, setModalCriarVisible] = useState(false);
  const [modalApostadorVisible, setModalApostadorVisible] = useState(false);
  const [apostaSelecionadaId, setApostaSelecionadaId] = useState<string | null>(null);

  const abrirApostadorModal = (id: string) => {
    setApostaSelecionadaId(id);
    setModalApostadorVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalCriarVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Criar nova aposta</Text>
      </TouchableOpacity>

      {state.apostas.length === 0 ? (
        <Text style={{ marginTop: 20, textAlign: 'center' }}>Nenhuma aposta criada.</Text>
      ) : (
        <FlatList
          data={state.apostas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.apostaItem}
              onPress={() => abrirApostadorModal(item.id)}
            >
              <Text style={styles.apostaText}>
                {item.jogador1} x {item.jogador2}
              </Text>
              <Text style={styles.apostaSubtext}>
                % ADM: {item.porcentagemAdm} - {item.encerrada ? 'Encerrada' : 'Aberta'}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <CriarApostaModal
        visible={modalCriarVisible}
        onClose={() => setModalCriarVisible(false)}
      />

      {apostaSelecionadaId && (
        <ApostadorModal
          visible={modalApostadorVisible}
          onClose={() => setModalApostadorVisible(false)}
          apostaId={apostaSelecionadaId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  apostaItem: {
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  apostaText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  apostaSubtext: {
    fontSize: 14,
    color: '#555',
  },
});

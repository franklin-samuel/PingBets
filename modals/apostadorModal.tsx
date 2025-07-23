import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useApostas } from '../context/ApostaContext';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  visible: boolean;
  onClose: () => void;
  apostaId: string;
}

const ApostadorModal = ({ visible, onClose, apostaId }: Props) => {
  const { dispatch } = useApostas();
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [apostaEm, setApostaEm] = useState<'jogador1' | 'jogador2'>('jogador1');

  const adicionar = () => {
    if (!nome || !valor) return;

    dispatch({
      type: 'ADICIONAR_APOSTADOR',
      payload: {
        apostaId,
        apostador: {
          id: uuidv4(),
          nome,
          valor: parseFloat(valor),
          apostaEm,
        },
      },
    });

    setNome('');
    setValor('');
    setApostaEm('jogador1');
    onClose();
  };

  // Tipagem explícita para garantir o tipo correto
  const options: { label: string; value: 'jogador1' | 'jogador2' }[] = [
    { label: 'Apostar no Jogador 1', value: 'jogador1' },
    { label: 'Apostar no Jogador 2', value: 'jogador2' },
  ];

  return (
    <Modal visible={visible} animationType="fade" style={styles.modal}>
      <View style={styles.main}>
        <Text>Adicionar Apostador</Text>
        <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput
          placeholder="Valor da Aposta"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />

        {options.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={styles.optionContainer}
            onPress={() => setApostaEm(value)}
          >
            <View style={[styles.circle, apostaEm === value && styles.selectedCircle]} />
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={adicionar}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {

  } , 
  main: {
    backgroundColor: '#00000'
  } , 
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  circle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#333',
  },
});

export default ApostadorModal;

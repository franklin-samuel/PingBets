import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useApostas } from '../context/ApostaContext'
import { v4 as uuidv4 } from 'uuid';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const CriarApostaModal = ({ visible, onClose }: Props) => {
    const { dispatch } = useApostas();
    const [jogador1, setJogador1] = useState('');
    const [jogador2, setJogador2] = useState('');
    const [porcentagemAdm, setPorcentagemAdm] = useState('10');

    const criarAposta = () => {
        if (!jogador1 || !jogador2) return;

        dispatch({
            type: 'CRIAR_APOSTA',
            payload: {
                id: uuidv4(),
                jogador1,
                jogador2,
                porcentagemAdm: parseInt(porcentagemAdm),
                apostadores: [],
                encerrada: false
            },
        });

        setJogador1('')
        setJogador2('');
        setPorcentagemAdm('10');
        onClose()
    };

    return (
        <Modal visible={visible} animationType='slide'> 
            <View style={{padding: 20}}>
                <Text>Criar nova aposta</Text>
                <TextInput placeholder='Jogador 1' value={jogador1} onChangeText={setJogador1}/>
                <TextInput placeholder='Jogador 2' value={jogador1} onChangeText={setJogador2}/>
                <TextInput 
                    placeholder='% ADM (ex: 10)'
                    value={porcentagemAdm}
                    onChangeText={setPorcentagemAdm}
                    keyboardType="numeric"
                />
                <TouchableOpacity onPress={criarAposta}>Criar</TouchableOpacity>
                <TouchableOpacity onPress={onClose}>Cancelar</TouchableOpacity>
            </View>
        </Modal>

    )
}

export default CriarApostaModal;


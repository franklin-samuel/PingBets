import React from "react";
import { View, Text, TouchableOpacity, Button,  ScrollView, StyleSheet } from 'react-native';
import { useApostas } from "../context/ApostaContext";

export default function Home() {
    const { state } = useApostas();

    return (
        <ScrollView>
            <Text>Apostas Ativas</Text>
            {state.apostas.filter(a => !a.encerrada).map((aposta) => (
                <View key={aposta.id}>
                    <Text>{aposta.jogador1} vs {aposta.jogador2}</Text>
                    <Text>Total de apostadores: {aposta.apostadores.length}</Text>
                    <TouchableOpacity onPress={() => {}}>Adicionar apostador</TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>Adicionar apostador</TouchableOpacity>
                </View>
            ))}

            <Text>Apostas Encerradas</Text>
            {state.apostas.filter(a => a.encerrada).map((aposta) => (
                <View key={aposta.id}>
                    <Text>{aposta.jogador1} vs {aposta.jogador2}</Text>
                    <Text>Vencedor: {aposta.vencedor}</Text>
                    <Text>Distribuição:</Text>
                    {Object.entries(aposta.distribuicao || {}).map(([id, valor]) => (
                        <Text key={id}>Apostador {id}: R$ {valor}</Text>
                    ))}
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        padding: 20
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    viewApostasAtivas: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 10
    },
    textApostasEncerradas: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
    },
    viewApostasEncerradas: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1
    }
})

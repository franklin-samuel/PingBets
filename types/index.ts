export interface Jogador {
    id: string,
    nome: string
}

export interface Apostador {
    id: string,
    nome: string,
    valor: number,
    apostaNo: string
}

export interface Aposta {
    id: string,
    jogador1: Jogador,
    jogador2: Jogador,
    apostadores: Apostador[], // inclui jogadores que apostarem
    encerrada: boolean,
    vencedorId?: string, //define o vencedor após o termino
    porcentagemAdm: number, // 10 para 10%
    data: string // ISO
}
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export type Apostador = {
  id: string;
  nome: string;
  valor: number;
  apostaEm: 'jogador1' | 'jogador2';
};

export type Aposta = {
  id: string;
  jogador1: string;
  jogador2: string;
  porcentagemAdm: number;
  apostadores: Apostador[];
  encerrada: boolean;
  vencedor?: 'jogador1' | 'jogador2';
  distribuicao?: { [apostadorId: string]: number }; // quanto cada um ganhou
};

// Estado Global
type ApostasState = {
  apostas: Aposta[];
};

type ApostasAction =
  | { type: 'CRIAR_APOSTA'; payload: Aposta }
  | { type: 'ADICIONAR_APOSTADOR'; payload: { apostaId: string; apostador: Apostador } }
  | { type: 'ENCERRAR_APOSTA'; payload: { apostaId: string; vencedor: 'jogador1' | 'jogador2' } };

const ApostasContext = createContext<{
  state: ApostasState;
  dispatch: React.Dispatch<ApostasAction>;
} | undefined>(undefined);

// Reducer
const apostasReducer = (state: ApostasState, action: ApostasAction): ApostasState => {
  switch (action.type) {
    case 'CRIAR_APOSTA':
      return { apostas: [...state.apostas, action.payload] };

    case 'ADICIONAR_APOSTADOR':
      return {
        apostas: state.apostas.map((a) =>
          a.id === action.payload.apostaId
            ? { ...a, apostadores: [...a.apostadores, action.payload.apostador] }
            : a
        ),
      };

    case 'ENCERRAR_APOSTA': {
      const { apostaId, vencedor } = action.payload;
      return {
        apostas: state.apostas.map((a) => {
          if (a.id !== apostaId) return a;

          const total = a.apostadores.reduce((s, ap) => s + ap.valor, 0);
          const totalPerdedores = a.apostadores
            .filter((ap) => ap.apostaEm !== vencedor)
            .reduce((s, ap) => s + ap.valor, 0);
          const totalGanhadores = a.apostadores
            .filter((ap) => ap.apostaEm === vencedor)
            .reduce((s, ap) => s + ap.valor, 0);

          const valorDistribuir = totalPerdedores * ((100 - a.porcentagemAdm) / 100);
          const distribuicao: { [apostadorId: string]: number } = {};

          a.apostadores.forEach((ap) => {
            if (ap.apostaEm === vencedor) {
              const proporcao = ap.valor / totalGanhadores;
              distribuicao[ap.id] = Math.floor(proporcao * valorDistribuir);
            }
          });

          return {
            ...a,
            encerrada: true,
            vencedor,
            distribuicao,
          };
        }),
      };
    }

    default:
      return state;
  }
};

// Provider
export const ApostasProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(apostasReducer, { apostas: [] });

  return (
    <ApostasContext.Provider value={{ state, dispatch }}>
      {children}
    </ApostasContext.Provider>
  );
};

// Hook
export const useApostas = () => {
  const context = useContext(ApostasContext);
  if (!context) throw new Error('useApostas deve ser usado dentro do ApostasProvider');
  return context;
};
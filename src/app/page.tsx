"use client";
import { useState } from "react";
import Dado from "@/components/Dado";

export default function JogoDados() {
  // --- ESTADOS DO JOGO ---
  const [rodada, setRodada] = useState(1);
  const [dadosA, setDadosA] = useState([1, 1]);
  const [dadosB, setDadosB] = useState([1, 1]);
  const [turnoA, setTurnoA] = useState(true); // Controla qual botão está ativo
  const [statusRodada, setStatusRodada] = useState("Jogador A, comece a rodada!");
  
  // Placar para saber quem venceu a partida no final
  const [vitoriasA, setVitoriasA] = useState(0);
  const [vitoriasB, setVitoriasB] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  // Função para gerar número aleatório de 1 a 6
  const rolar = () => Math.floor(Math.random() * 6) + 1;

  // --- AÇÃO DO JOGADOR A ---
  const jogarJogadorA = () => {
    setDadosA([rolar(), rolar()]);
    setTurnoA(false); // Passa a vez para o B
    setStatusRodada("Agora é a vez do Jogador B!");
  };

  // --- AÇÃO DO JOGADOR B ---
  const jogarJogadorB = () => {
    const novosDadosB = [rolar(), rolar()];
    setDadosB(novosDadosB);

    // Soma os pontos para ver quem ganhou a RODADA
    const somaA = dadosA[0] + dadosA[1];
    const somaB = novosDadosB[0] + novosDadosB[1];

    if (somaA > somaB) {
      setVitoriasA(vitoriasA + 1);
      setStatusRodada("Jogador A venceu esta rodada!");
    } else if (somaB > somaA) {
      setVitoriasB(vitoriasB + 1);
      setStatusRodada("Jogador B venceu esta rodada!");
    } else {
      setStatusRodada("Esta rodada empatou!");
    }

    // Lógica para avançar a rodada ou encerrar o jogo
    if (rodada < 5) {
      // Espera um pouco para o jogador ler o resultado antes de mudar a rodada
      setTimeout(() => {
        setRodada(rodada + 1);
        setTurnoA(true);
        setStatusRodada("Jogador A, comece a próxima rodada!");
      }, 1500);
    } else {
      setFimDeJogo(true);
    }
  };

  // --- FUNÇÃO PARA REINICIAR (BOTÃO FINAL) ---
  const reiniciarJogo = () => {
    setRodada(1);
    setDadosA([1, 1]);
    setDadosB([1, 1]);
    setVitoriasA(0);
    setVitoriasB(0);
    setTurnoA(true);
    setFimDeJogo(false);
    setStatusRodada("Jogador A, comece a rodada!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-black font-sans">
      
      {/* Container Principal (Layout da Foto do Professor) */}
      <div className="bg-white border-2 border-gray-200 rounded-[2rem] p-8 w-full max-w-sm shadow-sm text-center">
        
        {/* Topo: Número da Rodada */}
        <div className="flex items-center mb-10">
          <div className="h-[1px] bg-gray-300 flex-grow"></div>
          <h1 className="px-4 text-2xl font-bold italic">Rodada {rodada}</h1>
          <div className="h-[1px] bg-gray-300 flex-grow"></div>
        </div>

        {/* Área dos Jogadores e Dados */}
        <div className="flex justify-between items-start mb-8">
          {/* Lado Jogador A */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex gap-1 mb-3">
              <Dado valor={dadosA[0]} />
              <Dado valor={dadosA[1]} />
            </div>
            <p className="font-bold text-lg">Jogador A</p>
            <p className="text-sm text-gray-500 italic">
              {somaA_total(dadosA)} pontos
            </p>
          </div>

          {/* Lado Jogador B */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex gap-1 mb-3">
              <Dado valor={dadosB[0]} />
              <Dado valor={dadosB[1]} />
            </div>
            <p className="font-bold text-lg">Jogador B</p>
            <p className="text-sm text-gray-500 italic">
              {somaB_total(dadosB)} pontos
            </p>
          </div>
        </div>

        {/* Mensagem de quem venceu a rodada */}
        <div className="h-12 mb-6 flex items-center justify-center">
          <p className="font-semibold text-gray-700">{statusRodada}</p>
        </div>

        {/* --- ÁREA DE BOTÕES OU MENSAGEM FINAL --- */}
        {!fimDeJogo ? (
          <div className="flex gap-4">
            {/* Botão Jogador A */}
            <button
              onClick={jogarJogadorA}
              disabled={!turnoA}
              className={`flex-1 py-4 border-2 rounded-full font-bold transition ${
                turnoA 
                ? "border-gray-400 text-gray-700 active:bg-gray-100" 
                : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <span className="bg-gray-400 text-white px-2 py-0.5 rounded mr-1">Jogar</span> Dado
            </button>

            {/* Botão Jogador B */}
            <button
              onClick={jogarJogadorB}
              disabled={turnoA}
              className={`flex-1 py-4 border-2 rounded-full font-bold transition ${
                !turnoA 
                ? "border-black bg-black text-white active:bg-gray-800 shadow-md" 
                : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              Jogar <span className="bg-white text-black px-2 py-0.5 rounded ml-1">Dado</span>
            </button>
          </div>
        ) : (
          /* MENSAGEM FINAL E REINICIAR */
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="bg-gray-100 p-4 rounded-2xl mb-6 border-2 border-dashed border-gray-300">
              <h2 className="text-xl font-black uppercase text-red-600 italic">
                {vitoriasA > vitoriasB ? "O Jogador A Venceu a Partida!" : 
                 vitoriasB > vitoriasA ? "O Jogador B Venceu a Partida!" : 
                 "A Partida terminou em Empate!"}
              </h2>
              <p className="text-sm mt-1">Placar final: {vitoriasA} vs {vitoriasB}</p>
            </div>
            
            <button
              onClick={reiniciarJogo}
              className="w-full py-5 bg-red-500 text-white rounded-2xl font-bold text-xl hover:bg-red-600 transition-all shadow-lg hover:shadow-red-200 active:scale-95"
            >
              JOGAR NOVAMENTE
            </button>
          </div>
        )}

      </div>

      {/* Rodapé explicativo */}
      <p className="mt-8 text-gray-400 text-xs uppercase tracking-widest">
        Jogo de Dados em Next.js
      </p>
    </main>
  );
}

// Funções auxiliares para mostrar a soma embaixo do nome
function somaA_total(d: number[]) { return d[0] + d[1]; }
function somaB_total(d: number[]) { return d[0] + d[1]; }
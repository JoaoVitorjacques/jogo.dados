"use client"; // Necessário para usar botões e estados
import { useState } from "react";
import Dado from "@/components/Dado";

export default function JogoDados() {
  // Estados: onde o React guarda as informações que mudam na tela
  const [rodada, setRodada] = useState(1);
  const [dadosA, setDadosA] = useState([1, 1]); // Jogador A começa com dois dados valor 1
  const [dadosB, setDadosB] = useState([1, 1]); // Jogador B começa com dois dados valor 1
  const [turnoA, setTurnoA] = useState(true);   // Controla se é a vez do Jogador A
  const [statusRodada, setStatusRodada] = useState("Clique para iniciar!");
  const [vitoriasA, setVitoriasA] = useState(0);
  const [vitoriasB, setVitoriasB] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  const rolar = () => Math.floor(Math.random() * 6) + 1;

  const jogarA = () => {
    setDadosA([rolar(), rolar()]);
    setTurnoA(false); // Desativa botão A, ativa botão B
    setStatusRodada("Vez do Jogador B");
  };

  const jogarB = () => {
    const novosDadosB = [rolar(), rolar()];
    setDadosB(novosDadosB);

    // Lógica de quem venceu a rodada atual
    const somaA = dadosA[0] + dadosA[1];
    const somaB = novosDadosB[0] + novosDadosB[1];

    if (somaA > somaB) {
      setVitoriasA(vitoriasA + 1);
      setStatusRodada("Jogador A Venceu a Rodada!");
    } else if (somaB > somaA) {
      setVitoriasB(vitoriasB + 1);
      setStatusRodada("Jogador B Venceu a Rodada!");
    } else {
      setStatusRodada("Empate na Rodada!");
    }

    // Avançar rodada ou terminar
    if (rodada < 5) {
      setTimeout(() => {
        setRodada(rodada + 1);
        setTurnoA(true);
      }, 1500); // Espera 1.5s para trocar a rodada e dar tempo de ler o resultado
    } else {
      setFimDeJogo(true);
    }
  };

  const reiniciar = () => {
    setRodada(1);
    setVitoriasA(0);
    setVitoriasB(0);
    setFimDeJogo(false);
    setTurnoA(true);
    setStatusRodada("Clique para iniciar!");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-black font-sans">
      <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 w-full max-w-sm shadow-sm">
        
        {/* Cabeçalho da Rodada */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-[1px] bg-gray-300 flex-grow"></div>
          <h1 className="px-4 text-xl font-bold italic">Rodada {rodada}</h1>
          <div className="h-[1px] bg-gray-300 flex-grow"></div>
        </div>

        {/* Área dos Jogadores */}
        <div className="flex justify-between items-start mb-12">
          {/* Jogador A */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex gap-1 mb-2">
              <Dado valor={dadosA[0]} />
              <Dado valor={dadosA[1]} />
            </div>
            <p className="font-medium">Jogador A</p>
            {fimDeJogo && <p className="text-xs text-blue-600">Vitórias: {vitoriasA}</p>}
          </div>

          {/* Jogador B */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex gap-1 mb-2">
              <Dado valor={dadosB[0]} />
              <Dado valor={dadosB[1]} />
            </div>
            <p className="font-medium">Jogador B</p>
            {fimDeJogo && <p className="text-xs text-blue-600">Vitórias: {vitoriasB}</p>}
          </div>
        </div>

        {/* Resultado Central */}
        <div className="text-center mb-8 h-8">
          <p className="font-semibold text-lg">{statusRodada}</p>
        </div>

        {/* Botões */}
        {!fimDeJogo ? (
          <div className="flex gap-4">
            <button 
              onClick={jogarA}
              disabled={!turnoA}
              className={`flex-1 py-3 border-2 rounded-full font-bold transition ${turnoA ? 'border-gray-400 text-gray-700 active:bg-gray-100' : 'border-gray-200 text-gray-300'}`}
            >
              <span className="bg-gray-400 text-white px-2 py-0.5 rounded mr-1">Jogar</span> Dado
            </button>

            <button 
              onClick={jogarB}
              disabled={turnoA}
              className={`flex-1 py-3 border-2 rounded-full font-bold transition ${!turnoA ? 'border-black bg-black text-white active:bg-gray-800' : 'border-gray-200 text-gray-300'}`}
            >
              Jogar <span className="bg-white text-black px-2 py-0.5 rounded ml-1">Dado</span>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-black mb-4 uppercase">
              {vitoriasA > vitoriasB ? "Jogador A Venceu!" : vitoriasB > vitoriasA ? "Jogador B Venceu!" : "Empate Geral!"}
            </h2>
            <button 
              onClick={reiniciar}
              className="w-full py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-200"
            >
              Jogar Novamente
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
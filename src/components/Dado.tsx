export default function Dado({ valor }: { valor: number }) {
  return (
    <div className="flex flex-col items-center">
      {/* O src busca a imagem na pasta public/dados usando o número sorteado */}
      <img 
        src={`/dados/dado${valor}.png`} 
        alt={`Dado ${valor}`} 
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />
    </div>
  );
}
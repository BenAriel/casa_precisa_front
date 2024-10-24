import Image from 'next/image';

export default function Inicio() {  
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-blue-500 text-white">
            <div className="flex justify-center items-center">
                <Image 
                    src="casa_precisa_front/imagens/img1.png" 
                    alt="Imagem da Casa" 
                    width={800} // Valor placeholder para a largura
                    height={600} // Valor placeholder para a altura
                    className="w-full h-[80%] object-cover" 
                    style={{ width: '100%', height: '80%' }} // Mantém o comportamento CSS
                    unoptimized
                />
            </div>

            {/* Texto à direita */}
            <div className="flex flex-col justify-center px-8">
                <h1 className="text-4xl font-bold mb-4">Calculadora de Preço de Casas</h1>
                <p className="text-lg mb-4">
                    Nosso site utiliza inteligência artificial avançada para calcular o preço da sua casa. Saber o preço correto da sua propriedade é essencial para tomar decisões informadas, seja para venda, compra ou investimento. Confie em nossa tecnologia para obter estimativas precisas e confiáveis.
                </p>
                <p className="text-lg">
                    A inteligência artificial considera diversos fatores, como o tamanho do imóvel, localização e condições, para fornecer o valor mais adequado ao mercado atual.
                </p>
            </div>
        </div>
    );
}

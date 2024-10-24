import Image from 'next/image';

export default function ComoFunciona() {
    return (
        <div className="text-center py-16 bg-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-black">Como Funciona?</h2>

            {/* Grid layout com ajuste de alinhamento */}
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 gap-8 items-center">

                {/* Primeiro bloco */}
                <div className="flex flex-col items-center">
                    <div className="rounded-full w-40 h-40 overflow-hidden mb-4 shadow-xl border-8 border-white">
                        <Image 
                            src="/imagens/ComoFunciona1.jpg" 
                            alt="Inserir dados" 
                            width={160} // Valor aproximado da largura
                            height={160} // Valor aproximado da altura
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Inserir dados</h3>
                    <p className="text-black">Preencha as informações da sua casa, como tamanho, número de quartos, e ano de construção.</p>
                </div>

                {/* Segundo bloco */}
                <div className="flex flex-col items-center">
                    <div className="rounded-full w-40 h-40 overflow-hidden mb-4 shadow-xl border-8 border-white">
                        <Image 
                            src="/imagens/ComoFunciona2.png" 
                            alt="Clique em calcular" 
                            width={160} // Valor aproximado da largura
                            height={160} // Valor aproximado da altura
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Clique em calcular</h3>
                    <p className="text-black">Após inserir os dados, clique no botão para calcular o valor estimado da sua casa.</p>
                </div>

                {/* Terceiro bloco */}
                <div className="flex flex-col items-center">
                    <div className="rounded-full w-40 h-40 overflow-hidden mb-4 shadow-xl border-8 border-white">
                        <Image 
                            src="/imagens/ComoFunciona3.jpg" 
                            alt="Veja o valor da casa" 
                            width={160} // Valor aproximado da largura
                            height={160} // Valor aproximado da altura
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Veja o valor da casa</h3>
                    <p className="text-black">Receba imediatamente a estimativa do valor da sua casa com base nas informações fornecidas.</p>
                </div>
            </div>
        </div>
    );
}

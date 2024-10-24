"use client";
import SelectBox from "./componentes/SelectBox";
import InputBox from "./componentes/InputBox";
import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ComoFunciona from "./componentes/ComoFunciona";
import Inicio from "./componentes/Inicio";

interface selectBoxProps {
  campo: string;
  id: string;
}
interface bairros {
  bairro: string;
  valor: number;
}

const bairros: bairros[] = [
  { bairro: "Rincão", valor: 6 },
  { bairro: "Bom Jardim", valor: 6 },
  { bairro: "Centro", valor: 7 },
  { bairro: "Abolição", valor: 5 },
  { bairro: "Aeroporto", valor: 5 },
  { bairro: "Alto da Conceição", valor: 4 },
  { bairro: "Alto de São Manoel", valor: 7 },
  { bairro: "Alto do Sumaré", valor: 5 },
  { bairro: "Área Rural de Mossoró", valor: 4 },
  { bairro: "Barrocas", valor: 3 },
  { bairro: "Belo Horizonte", valor: 4 },
  { bairro: "Boa Vista", valor: 5 },
  { bairro: "Bela Vista", valor: 4 },
  { bairro: "Bom Jesus", valor: 5 },
  { bairro: "Dix-Sept Rosado", valor: 2 },
  { bairro: "Doze Anos", valor: 9 },
  { bairro: "Dom Jaime Câmara", valor: 5 },
  { bairro: "Ilha de Santa Luzia", valor: 8 },
  { bairro: "Itapetinga", valor: 2 },
  { bairro: "Lagoa do Mato", valor: 3 },
  { bairro: "Monsenhor Américo", valor: 3 },
  { bairro: "Nova Betânia", valor: 9 },
  { bairro: "Paredões", valor: 5 },
  { bairro: "Pintos", valor: 1 },
  { bairro: "Planalto 13 de Maio", valor: 6 },
  { bairro: "Presidente Costa e Silva", valor: 6 },
  { bairro: "Redenção", valor: 3 },
  { bairro: "Santa Delmira", valor: 5 },
  { bairro: "Santo Antônio", valor: 5 },
  { bairro: "Santa Júlia", valor: 2 },
];

const campos: selectBoxProps[] = [
  { campo: "Número de banheiros", id: "Num_Bathrooms" },
  { campo: "Número de quartos", id: "Num_Bedrooms" },
  { campo: "Número de vagas na garagem", id: "Garage_Size" },
];

export default function Home() {
  const [formData, setFormData] = useState({
    Square_Footage: "",
    Num_Bedrooms: "",
    Num_Bathrooms: "",
    Year_Built: "",
    Garage_Size: "",
    Neighborhood_Quality: "",
  });

  const [apiResponse, setApiResponse] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [nomeBairro, setNomeBairro] = useState("");
  const [nomeRua, setRua] = useState("");
  const [errors, setErrors] = useState({
    Square_Footage: "",
    Num_Bedrooms: "",
    Num_Bathrooms: "",
    Year_Built: "",
    Garage_Size: "",
    Neighborhood_Quality: "",
  });

  const handleInputChange = (id: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCepChange = async (cep: string) => {
    const cepNumerico = cep.replace(/\D/g, "");
    if (cepNumerico.length === 8) {
      try {
        console.log("Buscando CEP:", cepNumerico);
        const response = await axios.get(`https://viacep.com.br/ws/${cepNumerico}/json/`);
        console.log("Dados do CEP:", response.data);
        console.log("Bairro:", response.data.bairro);

        const bairroApi = response.data.bairro;
        console.log("Bairro encontrado:", bairroApi);
        const bairroEncontrado = bairros.find((b) => b.bairro === bairroApi);

        console.log("Bairro encontrado nas constantes:", bairroEncontrado);

        if (bairroEncontrado) {
          setFormData((prevData) => ({
            ...prevData,
            Neighborhood_Quality: bairroEncontrado.valor.toString(),
          }));
          setNomeBairro(bairroApi);
          setRua(response.data.logradouro);
          setRating(bairroEncontrado.valor);
        } else {
          console.error("Bairro não encontrado");
          setRating(null);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleSubmit = async () => {

    const newErrors = {
      Square_Footage: formData.Square_Footage === "" ? "Este campo é obrigatório" : "",
      Num_Bedrooms: formData.Num_Bedrooms === "" ? "Este campo é obrigatório" : "",
      Num_Bathrooms: formData.Num_Bathrooms === "" ? "Este campo é obrigatório" : "",
      Year_Built: formData.Year_Built === "" ? "Este campo é obrigatório" : "",
      Garage_Size: formData.Garage_Size === "" ? "Este campo é obrigatório" : "",
      Neighborhood_Quality: formData.Neighborhood_Quality === "" ? "Este campo é obrigatório" : "",
    };

    setErrors(newErrors);

    // Verifique se há algum erro antes de continuar com a requisição
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      return; // Para a execução se houver erros
    }
    try {
      const squareFootageInFeet = Math.round(parseFloat(formData.Square_Footage) * 10.7639);

      const dadosParaEnvio = {
        Square_Footage: squareFootageInFeet,
        Num_Bedrooms: parseInt(formData.Num_Bedrooms, 10),
        Num_Bathrooms: parseInt(formData.Num_Bathrooms, 10),
        Year_Built: parseInt(formData.Year_Built, 10),
        Garage_Size: parseFloat(formData.Garage_Size),
        Neighborhood_Quality: parseInt(formData.Neighborhood_Quality, 10),
      };

      console.log("Enviando dados para predição:", dadosParaEnvio);
      const response = await axios.post("http://localhost:5000/predict", dadosParaEnvio);
      const prediction = Number(response.data.predicao);
      const resultadoFinal = prediction / 1.60;
      const formattedPrediction = Number(resultadoFinal).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setApiResponse(formattedPrediction);
    } catch (error) {
      console.error("Erro ao fazer a predição:", error);
      setApiResponse("Erro ao obter a predição");
    }
  };

  return (
    <div>
      <Inicio />

      <ComoFunciona />

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 px-20 mb-4">
          {campos.map((campo, index) => (
            <SelectBox
              key={index}
              campo={campo.campo}
              id={campo.id}
              onChange={(value: string) => handleInputChange(campo.id, value)}
            />
          ))}

          <div className="mb-4">
            <InputBox
              tag="M²"
              titulo="Tamanho do terreno"
              id="Square_Footage"
              onChange={(value: string) => handleInputChange("Square_Footage", value)}
            />
            {errors.Square_Footage && <p className="text-red-500">{errors.Square_Footage}</p>}
          </div>

          <div className="mb-4">
            <InputBox
              tag=""
              titulo="Ano de construção"
              id="Year_Built"
              onChange={(value: string) => handleInputChange("Year_Built", value)}
            />
            {errors.Year_Built && <p className="text-red-500">{errors.Year_Built}</p>}
          </div>

          <div className="mb-4">
            <InputBox
              tag=""
              titulo="CEP"
              id="Neighborhood_Quality"
              onChange={(value: string) => handleCepChange(value)}
            />
            {errors.Neighborhood_Quality && <p className="text-red-500">{errors.Neighborhood_Quality}</p>}
          </div>
        </div>

        {rating !== null && (
          <div className="mt-4 bg-yellow-100 p-4 rounded-lg">
            <h4 className="text-lg font-bold text-black">{nomeRua}</h4>
            <h3 className="text-md font-semibold text-black">
              A valiação do bairro {nomeBairro} :
            </h3>

            <div className="flex">
              {Array.from({ length: 10 }, (_, i) => (
                <FaStar key={i} color={i < rating ? "gold" : "gray"} size={20} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <div className="flex justify-center">
            <button
              className="bg-blue-800 text-white p-5 rounded-lg mt-6 w-1/3 hover:bg-blue-700 transition-colors text-lg font-bold"
              onClick={handleSubmit}
            >
              Calcular
            </button>
          </div>

          <div className="mt-6">
            <h2 className=" items-center justify-center bg-blue-100 text-blue-900 p-6 rounded-lg shadow-md border border-blue-300 text-2xl font-semibold">Valor da casa: {apiResponse}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { Fragment, useState } from "react";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";

export default function App() {
  const [senha, setSenha] = useState("");
  const [listaSenhas, setListasSenhas] = useState([]);
  const [forcaSenha, setForcaSenha] = useState("");
  const [mostrarSenha, setmostrarSenha] = useState(false);
  const [gerarSenha, setGerarSenha] = useState("");
  const [quantidadeGerar, setQuantidadeGerar] = useState(0);

  const adicionarSenha = (e) => {
    e.preventDefault();
    if (senha.trim() !== "") {
      setListasSenhas([...listaSenhas, senha]);
      setSenha("");
    }
  };

  const verificarForçaSenha = (senha) => {
    let forca = 0;

    /[A-Z]/.test(senha) ? forca++ : null;
    /[a-z]/.test(senha) ? forca++ : null;
    /[0-9]/.test(senha) ? forca++ : null;
    /[\W_]/.test(senha) ? forca++ : null;

    forca <= 1 ? setForcaSenha("Senha muito fraca") : null;
    forca === 2 ? setForcaSenha("Senha fraca") : null;
    forca === 3 ? setForcaSenha("Senha media") : null;
    forca === 4 ? setForcaSenha("Senha Forte") : null;
  };

  const geradorSenha = (quantidadeCarac) => {
    let novaSenha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*_,.?";
    const letrasGeradas = Array.from({ length: quantidadeCarac }, () =>
      novaSenha.charAt(Math.floor(Math.random() * novaSenha.length))
    ).join("");

    setGerarSenha(letrasGeradas);
  };

  return (
    <>
      <div className="flex justify-center bg-white h-14 items-center">
        <h1 className="text-3xl font-bold font-mono">Verificador de senha</h1>
      </div>

      <section className="flex justify-center items-center space-x-10  ">
        <form className="w-80 h-80 bg-white border border-gray-500 shadow-xl rounded-lg flex justify-center flex-col items-center lg:my-20 my-60">
          <FaLock size={48} />
          <div className="relative">
            <input
              className="border border-gray-500 shadow-lg rounded-lg p-2 my-5"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite uma senha"
              onChange={(e) => {
                setSenha(e.target.value);
                verificarForçaSenha(e.target.value);
              }}
              onBlur={() => setForcaSenha("")}
            />
            <button
              className="absolute flex top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              type="button"
              onClick={() => {
                setmostrarSenha(!mostrarSenha);
                
              }}
            >
              {mostrarSenha ? <FaEye size={20}/> : <FaEyeSlash size={20} />}
            </button>
          </div>
          <p
            className={`${
              forcaSenha === "Senha Forte" ? "text-green-500" : 
              forcaSenha === "Senha media" ? "text-yellow-500" : 
              forcaSenha === "Senha fraca" ? "text-orange-400" : "text-red-500"
            }`}
            >
          {forcaSenha}
          </p>
          <button
            className="border border-gray-500 p-2 rounded-2xl bg-blue-500 text-white"
            onClick={adicionarSenha}
          >
            Verificar
          </button>
        </form>
        <div className="w-96 h-96 flex-col m-auto bg-white border border-gray-500 shadow-xl rounded-lg  ">
          <h1 className="text-3xl font-bold font-mono text-center border-b-2 border-black">
            Senhas
          </h1>
          <ul className="flex-col text-red-400 text-center my-5">
            {listaSenhas.map((item, index) => (
              <li key={index} className="font-bold text-black">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
        <div className="w-96 h-80 m-auto bg-white border border-gray-500 shadow-xl rounded-lg">
          <h1 className="text-3xl font-bold font-mono text-center border-b-2 border-black">Gerador de senhas</h1>
          <h2 className="font-bold text-center my-2">Digite a quantidade de caracteres desejadas</h2>
          <input 
          value={quantidadeGerar}
          type="number"
          onChange={(e) => {setQuantidadeGerar(Number(e.target.value))}} 
          placeholder="Quantidade de caracteres"  
          className="border border-gray-500 shadow-lg rounded-lg p-2 my-5 flex m-auto"/>
          <p className="text-center font-bold my-8">{gerarSenha}</p>
          <button className="border border-gray-500 p-2 rounded-2xl bg-blue-500 text-white m-auto flex my-10" 
          onClick={() => geradorSenha(quantidadeGerar)}>Gerar</button>
        </div>
    </>
  );
}

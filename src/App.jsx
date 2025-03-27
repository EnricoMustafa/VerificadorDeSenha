import React, { useState } from "react";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { GrGithub } from "react-icons/gr";

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
    let novaSenha =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*_,.?";
    const letrasGeradas = Array.from({ length: quantidadeCarac }, () =>
      novaSenha.charAt(Math.floor(Math.random() * novaSenha.length))
    ).join("");

    setGerarSenha(letrasGeradas);
  };

  return (
<>
  {/* Cabeçalho */}
  <div className="flex justify-center bg-white h-14 items-center">
    <h1 className="text-2xl sm:text-3xl font-bold font-mono text-center">
      Verificador de senha
    </h1>
  </div>

  {/* Seção principal */}
  <section className="flex flex-wrap xl:flex-row sm:flex-col items-center justify-center gap-10 p-5">

    {/* Formulário de verificação */}
    <div className="flex justify-center items-center xl:justify-start w-full xl:w-auto">
      <form className="w-80 h-80 bg-white border border-gray-500 shadow-xl rounded-lg flex justify-center flex-col items-center xl:my-10 xl:mx-5">
        <FaLock size={48} />
        <div className="relative w-full px-5">
          <input
            className="border border-gray-500 shadow-lg rounded-lg p-2 my-5 w-full"
            type={mostrarSenha ? "text" : "password"}
            placeholder="Digite uma senha"
            onChange={(e) => {
              setSenha(e.target.value);
              verificarForçaSenha(e.target.value);
            }}
            onBlur={() => setForcaSenha("")}
          />
          <button
            className="absolute top-1/2 right-8 -translate-y-1/2 text-gray-600"
            type="button"
            onClick={() => setmostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
        <p
          className={`${
            forcaSenha === "Senha Forte"
              ? "text-green-500"
              : forcaSenha === "Senha media"
              ? "text-yellow-500"
              : forcaSenha === "Senha fraca"
              ? "text-orange-400"
              : "text-red-500"
          }`}
        >
          {forcaSenha}
        </p>
        <button
          className="px-7 py-3 transition-all border-gray-500 shadow-lg bg-blue-400 text-white font-bold rounded-3xl hover:bg-white hover:border-gray-200 border hover:text-black flex"
          onClick={adicionarSenha}
        >
          Salvar
        </button>
      </form>
    </div>

    {/* Lista de senhas */}
    <div className="w-96 h-auto sm:h-96 flex-col bg-white border border-gray-500 shadow-xl rounded-lg p-5">
      <h1 className="text-2xl sm:text-3xl font-bold font-mono text-center border-b-2 border-black">
        Senhas
      </h1>
      <ul className="text-center my-5">
        {listaSenhas.map((item, index) => (
          <li key={index} className="font-bold text-black">
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Gerador de senha */}
    <div className="w-full sm:w-96 h-auto bg-white border border-gray-500 shadow-xl rounded-lg p-5">
      <h1 className="text-2xl sm:text-3xl font-bold font-mono text-center border-b-2 border-black">
        Gerador de senhas
      </h1>
      <h2 className="font-bold text-center my-2 text-lg">
        Digite a quantidade de caracteres desejada
      </h2>
      <input
        min={0}
        value={quantidadeGerar}
        type="number"
        onChange={(e) => setQuantidadeGerar(Number(e.target.value))}
        placeholder="Quantidade de caracteres"
        className="border border-gray-500 shadow-lg rounded-lg p-2 my-5 flex m-auto w-3/4 sm:w-2/3"
      />
      <p className="text-center font-bold my-8 text-lg">{gerarSenha}</p>
      <button
        className="px-7 py-3 transition-all border-gray-500 shadow-lg bg-blue-400 text-white font-bold rounded-3xl m-auto hover:bg-white hover:border-gray-200 border hover:text-black flex"
        onClick={() => geradorSenha(quantidadeGerar)}
      >
        Gerar Senha
      </button>
    </div>
  </section>

  {/* Botão GitHub */}
  <div className="fixed bottom-4 right-4 p-3 sm:p-5">
    <a
      className="transition-all hover:bg-blue-400 hover:text-white border-gray-500 shadow-lg bg-white font-bold p-4 rounded-3xl text-black flex items-center"
      href="https://github.com/EnricoMustafa/VerificadorDeSenha.git"
    >
      Ir para GitHub
      <GrGithub className="mx-2" size={25} />
    </a>
  </div>
</>

  );
}

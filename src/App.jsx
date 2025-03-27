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
      <div className="flex justify-center bg-white h-14 items-center">
        <h1 className="text-3xl font-bold font-mono">Verificador de senha</h1>
      </div>

      <section className="flex justify-center items-center space-x-10 ">
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
            className="px-7 py-3 transition-all  border-gray-500 shadow-lg bg-blue-400 text-white font-bold p-4 rounded-3xl hover:bg-white hover:border-gray-200 border  hover:text-black flex"
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
        <h1 className="text-3xl font-bold font-mono text-center border-b-2 border-black">
          Gerador de senhas
        </h1>
        <h2 className="font-bold text-center my-2">
          Digite a quantidade de caracteres desejadas
        </h2>
        <input
          min={0}
          value={quantidadeGerar}
          type="number"
          onChange={(e) => {
            setQuantidadeGerar(Number(e.target.value));
          }}
          placeholder="Quantidade de caracteres"
          className="border border-gray-500 shadow-lg rounded-lg p-2 my-5 flex m-auto"
        />
        <p className="text-center font-bold my-8">{gerarSenha}</p>
        <button
          className=" px-7 py-3 transition-all  border-gray-500 shadow-lg bg-blue-400 text-white font-bold p-4 rounded-3xl m-auto hover:bg-white hover:border-gray-200 border  hover:text-black flex"
          onClick={() => geradorSenha(quantidadeGerar)}
        >
          Gerar Senha
        </button>
      </div>

      <div className="flex justify-end px-10 fixed bottom-4 right-4 p-3">
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

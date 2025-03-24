import React, { Fragment, useState } from "react";
import { FaLock } from "react-icons/fa";

export default function App() {

  const [senha, setSenha] = useState("");
  const [listaSenhas, setListasSenhas] = useState([]);

  const adicionarSenha = (e) =>{
    e.preventDefault();
    if(senha.trim() !== ""){
      setListasSenhas([...listaSenhas, senha]);
      setSenha("");
    }
  }

 
  return (
    <Fragment>
      <div className="flex justify-center bg-white h-14 items-center">
        <h1 className="text-3xl font-bold font-mono">Verificador de senha</h1>
      </div>

      <section className="flex justify-center items-cente space-x-10  ">
        <form className="w-80 h-80 bg-white border border-gray-500 shadow-xl rounded-lg flex justify-center flex-col items-center my-60">
        <FaLock 
        size={48}
        />
          <input
            className="border border-gray-500 shadow-lg rounded-lg p-2 my-5"
            type="password"
            placeholder="Digite uma senha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button className="border border-gray-500 p-2 rounded-2xl bg-blue-500 text-white" onClick={adicionarSenha}>
            Verificar
          </button>
        </form>
        <div className="w-96 h-96 flex-col m-auto bg-white border border-gray-500 shadow-xl rounded-lg  ">
          <h1 className="text-3xl font-bold font-mono text-center border-b-2 border-black">Senhas</h1>
          <ul className="flex-col text-red-400 text-center my-5">
            {listaSenhas.map((item, index) => (
              <li key={index} className="font-bold text-black">{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </Fragment>
  );
}

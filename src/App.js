import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";

function App() {

    const [input, SetInput] = useState('');
    const [cep, SetCep] = useState({});

    async function Pesquisar(){
      if(input === ''){
        alert('O campo está vazio');
      }else{
        try {
          const response = await api.get(`${input}/json`);
          SetCep(response.data);
          Limpar();
        } catch (e) {
          alert('Error');
          Limpar();
        }
      }
    }

    function Limpar(){
      SetInput("");
    }

  return (
    <section className="container">
      <h2>Buscar CEP</h2>

      <div className="container_Input">
        <input type="text" value={input} name="cep" onChange={(e)=> SetInput(e.target.value)} placeholder="Digite o seu cep..." />

        <button  onClick={Pesquisar}>
          <FiSearch/>
        </button>
      </div> {/* Container input */}

       {Object.keys(cep).length > 0 && (
          <div className="container_Info">
          <h3>{cep.cep}</h3>
  
          <span>{cep.localidade} - {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>
  
        </div>
       )}

    </section>
  );
}

export default App;

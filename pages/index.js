"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categorias = [
  {
    nome: "Salgados",
    produtos: [
      { nome: "Combo Mini Salgados (25 und)", preco: 30.0, sabores: true },
      { nome: "Combo Mini Salgados (50 und)", preco: 55.0, sabores: true }
    ]
  },
  {
    nome: "Bolos",
    produtos: [
      { nome: "Bolo de Cenoura com Chocolate", preco: 15.0 },
      { nome: "Bolo de Milho Cremoso", preco: 18.0 }
    ]
  },
  {
    nome: "Brigadeiros",
    produtos: [
      { nome: "Brigadeiro Gourmet (6 un)", preco: 10.0 },
      { nome: "Beijinho (6 un)", preco: 9.0 }
    ]
  },
  {
    nome: "Bebidas",
    produtos: [
      { nome: "Refrigerante Lata", preco: 5.0 },
      { nome: "Suco Natural", preco: 6.0 }
    ]
  }
];

const saboresDisponiveis = [
  "Coxinha de Frango",
  "Croquete de queijo/presunto",
  "Bolinha de Pizza",
  "Travesseirinho de Carne",
  "Mini-Churros"
];

export default function TelaPedidos() {
  const router = useRouter();
  const [carrinho, setCarrinho] = useState([]);

  const adicionarProduto = (produto) => {
    if (produto.sabores) {
      const saboresEscolhidos = prompt("Digite até 5 sabores separados por vírgula:\n" + saboresDisponiveis.join(", "));
      if (!saboresEscolhidos) return;
      const lista = saboresEscolhidos.split(",").map((s) => s.trim()).slice(0, 5);
      setCarrinho([...carrinho, { ...produto, saboresEscolhidos: lista }]);
    } else {
      setCarrinho([...carrinho, produto]);
    }
  };

  const irParaFinalizar = () => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    router.push("/finalizar");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">Cardápio</h1>

      {categorias.map((cat) => (
        <div key={cat.nome} className="mb-10">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">{cat.nome}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cat.produtos.map((prod, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">{prod.nome}</p>
                  <p className="text-sm text-gray-600">R$ {prod.preco.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => adicionarProduto(prod)}
                  className="bg-orange-500 text-white px-3 py-1 rounded-xl"
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-4 left-0 w-full flex justify-center">
        <button
          onClick={irParaFinalizar}
          disabled={carrinho.length === 0}
          className="bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-xl text-lg"
        >
          Finalizar Pedido ({carrinho.length})
        </button>
      </div>
    </div>
  );
}

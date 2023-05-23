import dotenv from "dotenv";
dotenv.config();


export async function searchCardEmpresa(celular) {
  
  const phaseId = 318137351;
  const pipeId = 302927698;
  try {
    //Buscando dados do Card Empresas
    const registrosCardEmpresas = await fetch(
      "https://api.pipefy.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': process.env.AUTH_PIPEFY,
        },
        body: JSON.stringify({
          "query": `{ findCards(pipeId: "${pipeId}", search: {fieldValue: "${celular}", fieldId: "celular"}) {
            edges {
              node {
                id
                fields {
                  name
                  value
                }
              }
            }
          } }`,
        }),
      }
    );

    // Transformando resposta de string para JSON
    const dadosDosCards = await registrosCardEmpresas.json();
    
    // Apenas os dados dos Cards
    const Card = dadosDosCards.data.findCards.edges;
    
    if(Card.length == 0){
      return {
        id: null
      }
    } else {
      return {
        id: Card[0].node.id
      };
    }

  } catch (err) {
    console.log(err);
  }
}
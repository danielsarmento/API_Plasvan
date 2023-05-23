import {createRecordTable} from '../services/CreateTableRecord.js'
import {createAndSearchEmpresa} from '../services/CreateAndSearchEmpresa.js'
import {createCardOportunidade} from '../services/CreateCardOportunidade.js'

export async function createRecord (req, res) {
    const {name, Empresa, Estado, Cidade, Email, Telefone, Produtos, Quantidade1, Produto_2, Quantidade2, Produto_3, Quantidade3, Mensagem} = req.body
    //As verificações serão feitas no front-end, por isso não será feito aqui.
    /* console.log("name: ", name)
    console.log("Empresa: ",Empresa)
    console.log("Produto_2: ", Produto_2)
    console.log("Quantidade2: ",Quantidade2)
    console.log("Produto_3: ", Produto_3)
    console.log("Quantidade3: ", Quantidade3) */
    try {
        const etiquetaId = "308171892"
        const produtos = {
            "Garrafão água Mineral 20L": 0,
            "Garrafão água Mineral 10L": 0,
            "Tampa Garrafa pet": 0,
            "Stretch COM tubete": 0,
            "Stretch SEM tubete": 0,
            "Termo encolhível": 0,
            "Tampa 20L COM vedante": 0
          };
          
          async function atualizarQuantidade(produto, quantidade) {
            if (produto in produtos) {
              produtos[produto] = quantidade;
            }
          }
          
          await atualizarQuantidade(Produtos, Number(Quantidade1));
          await atualizarQuantidade(Produto_2, Number(Quantidade2));
          await atualizarQuantidade(Produto_3, Number(Quantidade3));

          let Q1 = produtos["Garrafão água Mineral 20L"]
          let Q2 = produtos["Garrafão água Mineral 10L"]
          let Q3 = produtos["Tampa Garrafa pet"]
          let Q4 = produtos["Stretch COM tubete"]
          let Q5 = produtos["Stretch SEM tubete"]
          let Q6 = produtos["Termo encolhível"]
          let Q7 = produtos["Tampa 20L COM vedante"]
          //console.log("Números: ", Q1, Q2, Q3, Q4, Q5, Q6, Q7)
          const newName = name.toUpperCase()
        const record = await createRecordTable(newName, Email, Empresa, Estado,Cidade,Telefone,Q1,Q2,Q3,Q4,Q5,Q6,Q7,Mensagem) // ok
        //console.log('Record Id: ', record)

        const company = await createAndSearchEmpresa(newName, Empresa, Telefone, Email, Estado, Cidade, 10000) // ok
        //console.log('Dados: ', company.id, newName, Mensagem, record.idRecord,Q1,Q2,Q3,Q4,Q5,Q6,Q7)

        const oportunit = await createCardOportunidade(company.id, newName, Mensagem, record.idRecord,Q1,Q2,Q3,Q4,Q5,Q6,Q7)

        res.status(200).json({idCardOportunit: oportunit.id})

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"})
    }
}
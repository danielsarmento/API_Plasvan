import { getFormattedDate } from "../services/CreateDataAtual.js"
import dotenv from "dotenv";
dotenv.config();

export async function createCardOportunidade (companyId, name, mensagem, idForm, Q1, Q2, Q3, Q4, Q5, Q6, Q7) {
    const pipeIdOportunidade = "302927684"
    const phaseIdOportunidade = "318137273"
    const etiquetaId = "308171892"
    const dataAtual = getFormattedDate()
    
    try{

        const novoCardOportunidade = await fetch('https://api.pipefy.com/graphql',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.AUTH_PIPEFY
                },
                body: JSON.stringify({
                              "query": `mutation{ createCard (input: {pipe_id:${pipeIdOportunidade}  phase_id:${phaseIdOportunidade}  fields_attributes: [
                                  {field_id: "oportunidade", field_value: "${name} - ${dataAtual}"},
                                  {field_id: "empresa_destino_1", field_value: "${etiquetaId}"},
                                  {field_id: "origem", field_value: "Formulário Plasvan"}, 
                                  {field_id: "registro_do_formul_rio", field_value: "${idForm}"}, 
                                  {field_id: "empresa", field_value: "${companyId}"},
                                  {field_id: "mensagem", field_value: "${mensagem}"},
                                  {field_id: "produtos_plasvan", field_value: ["Garrafão água Mineral 20L", "Garrafão água Mineral 10L","Tampa Garrafa pet","Stretch COM tubete","Stretch SEM tubete","Termo encolhivel","Tampa 20L COM vedante"]},
                                  {field_id: "quantidade_garraf_o_gua_mineral_20l", field_value: "${Q1}"},
                                  {field_id: "quantidade_garraf_o_gua_mineral_10l", field_value: "${Q2}"},
                                  {field_id: "quantidade_tampa_garrafa_pet", field_value: "${Q3}"},
                                  {field_id: "quantidade_stretch_com_tubete", field_value: "${Q4}"},
                                  {field_id: "quantidade_stretch_sem_tubete", field_value: "${Q5}"},
                                  {field_id: "quantidade_termo_encolh_vel", field_value: "${Q6}"},
                                  {field_id: "quantidade_tampa_20l_com_vedante", field_value: "${Q7}"}]
                                  }) 
                                  { card {id title }}}`
                })
        });
    
        const data = await novoCardOportunidade.json();
        //console.log(data.data?.createCard?.card?.id)
        return {id: data.data?.createCard?.card?.id}
    } catch (err){
        console.log(err)
    }
}
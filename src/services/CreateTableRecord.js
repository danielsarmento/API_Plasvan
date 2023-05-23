import crypto from 'node:crypto';

export async function createRecordTable (
    name,
    Email,
    Empresa,
    Estado,
    Cidade,
    Telefone,
    Q1,
    Q2,
    Q3,
    Q4,
    Q5,
    Q6,
    Q7,
    Mensagem) {
    
    const tableId = "302927808";
    const idUnique = crypto.randomUUID()
    
    const recordTable = await fetch("https://api.pipefy.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: process.env.AUTH_PIPEFY,
        },
        //{name, Empresa, Estado, Cidade, Email, Telefone, Produtos, Quantidade1, Produto_2, Quantidade2, Produto_3, Quantidade3, Mensagem}
        body: JSON.stringify({
            "query": `mutation { createTableRecord (input: {table_id:${tableId}  fields_attributes: [
                            {field_id: "nome", field_value: "${name}"},
                            {field_id: "celular", field_value: "${Telefone}"},
                            {field_id: "e_mail", field_value: "${Email}"},
                            {field_id: "empresa", field_value: "${Empresa}"},
                            {field_id: "estado", field_value: "${Estado}"},
                            {field_id: "cidade", field_value: "${Cidade}"},
                            {field_id: "garraf_o_gua_mineral_20l", field_value: "${Q1}"},
                            {field_id: "garraf_o_gua_mineral_10l", field_value: "${Q2}"},
                            {field_id: "tampa_garrafa_pet", field_value: "${Q3}"},
                            {field_id: "stretch_com_tubete", field_value: "${Q4}"},
                            {field_id: "stretch_sem_tubete", field_value: "${Q5}"},
                            {field_id: "termo_encolhivel", field_value: "${Q6}"},
                            {field_id: "tampa_20l_com_vedante", field_value: "${Q7}"},
                            {field_id: "mensagem", field_value: "${Mensagem}"},
                            {field_id: "id", field_value: "${idUnique}"}
                        ] }) { table_record { id }}}`,
        }),
    });
    const data = await recordTable.json();
    //console.log("ID: ", data)
    return {idRecord: data.data?.createTableRecord?.table_record?.id}
}
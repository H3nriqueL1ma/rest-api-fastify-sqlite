/* eslint-disable @typescript-eslint/no-explicit-any */ // Cria um novo usuário no servidor.
async function $f855b82269797e02$export$fac6b4861de7f1ca(client, url) {
    const data_client = client;
    try {
        // Envia uma requisição POST para a rota /users do servidor com os dados do cliente.
        const response = await fetch(url + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data_client[0],
                profession: data_client[1],
                birthdate: data_client[2]
            })
        });
        // Verifica se a resposta da requisição é bem-sucedida.
        if (!response.ok) throw new Error("Failed to create a user.");
        // Retorna o objeto JSON do usuário criado.
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
async function $f855b82269797e02$export$fe8726939961c446(client, url) {
    try {
        const userName = client;
        // Envia uma requisição GET para a rota /users do servidor com o parâmetro de consulta ?name.equals=${userName}.
        const response = await fetch(url + `/users?name.equals=${userName}`);
        // Converte a resposta em JSON.
        const users = await response.json();
        // Retorna o array de objetos JSON dos usuários encontrados.
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function $f855b82269797e02$export$dc0df4e8eb0ce957(client, id, url) {
    const updated_data_client = client;
    const userId = parseInt(id);
    // Envia uma requisição PUT para a rota /users/${userId} do servidor com os dados atualizados do cliente.
    return fetch(url + `/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: updated_data_client[0],
            profession: updated_data_client[1],
            birthdate: updated_data_client[2]
        })
    }).then((response)=>response.json());
}
async function $f855b82269797e02$export$38dab5a9fea42f39(id, url) {
    const userId = parseInt(id);
    // Envia uma requisição DELETE para a rota /users/{userId} do servidor.
    return fetch(url + `/users/${userId}`, {
        method: "DELETE"
    }).then((response)=>response.json());
}


const $53ffd25df6034fb9$var$$button = document.querySelector("#button");
const $53ffd25df6034fb9$var$$table = document.querySelector("table");
const $53ffd25df6034fb9$var$$input_name = document.querySelector("input#name");
const $53ffd25df6034fb9$var$$input_profession = document.querySelector("input#profession");
const $53ffd25df6034fb9$var$$input_birth = document.querySelector("input#birth");
$53ffd25df6034fb9$var$$input_name?.setAttribute("autocomplete", "off");
$53ffd25df6034fb9$var$$input_profession?.setAttribute("autocomplete", "off");
$53ffd25df6034fb9$var$$input_birth?.setAttribute("autocomplete", "off");
$53ffd25df6034fb9$var$$button?.addEventListener("click", async (event)=>{
    event.preventDefault();
    const user_name = $53ffd25df6034fb9$var$$input_name ? $53ffd25df6034fb9$var$$input_name.value.toString() : "";
    const user_profession = $53ffd25df6034fb9$var$$input_profession ? $53ffd25df6034fb9$var$$input_profession.value.toString() : "";
    const user_birthdate = $53ffd25df6034fb9$var$$input_birth ? $53ffd25df6034fb9$var$$input_birth.value.toString() : "";
    const data = [
        user_name,
        user_profession,
        user_birthdate
    ];
    await (0, $f855b82269797e02$export$fac6b4861de7f1ca)(data, "http://localhost:3333");
    const users = await (0, $f855b82269797e02$export$fe8726939961c446)(data[0], "http://localhost:3333");
    users.forEach((user)=>{
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.profession}</td>
            <td>${user.birthdate}</td>
            <td>
                <button class="update">Editar</button>
                <button class="delete">Excluir</button>
            </td>
        `;
        $53ffd25df6034fb9$var$$table?.appendChild(newRow);
        const $button_update = newRow.querySelector(".update");
        const $button_delete = newRow.querySelector(".delete");
        $button_update?.addEventListener("click", ()=>{
            alert("Todas as edi\xe7\xf5es s\xe3o opcionais, ou seja, n\xe3o \xe9 preciso completar todos os campos para atualizar, basta deixar em branco.");
            const name_updated = prompt("Novo Nome:");
            const profession_updated = prompt("Nova Profiss\xe3o:");
            const birth_updated = prompt("Nova Data de Nascimento:");
            const updatedData = [
                name_updated !== null && name_updated !== "" ? name_updated : user.name,
                profession_updated !== null && profession_updated !== "" ? profession_updated : user.profession,
                birth_updated !== null && birth_updated !== "" ? birth_updated : user.birthdate
            ];
            (0, $f855b82269797e02$export$dc0df4e8eb0ce957)(updatedData, user.id, "http://localhost:3333").then((updatedUser)=>{
                $53ffd25df6034fb9$var$updateTableRow(newRow, updatedUser);
            });
        });
        $button_delete?.addEventListener("click", async ()=>{
            await (0, $f855b82269797e02$export$38dab5a9fea42f39)(user.id, "http://localhost:3333");
            newRow.remove();
        });
    });
});
function $53ffd25df6034fb9$var$updateTableRow(row, data) {
    const [idCell, nameCell, professionCell, birthdateCell] = row.cells;
    idCell.textContent = data.id;
    nameCell.textContent = data.name;
    professionCell.textContent = data.profession;
    birthdateCell.textContent = data.birthdate;
}


//# sourceMappingURL=bundle.js.map

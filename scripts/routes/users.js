// Cria um novo usuário no servidor.
export async function create_(client, url) {
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
		if (!response.ok) {
			throw new Error("Failed to create a user.");
		}

		// Retorna o objeto JSON do usuário criado.
		return response.json();
	} catch (error) {
		console.log(error);
	}
}

// Recupera usuários do servidor com base no nome.
export async function read_(client, url) {
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

// Atualiza um usuário existente no servidor.
export async function update_(client, id, url) {
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
	}).then(response => response.json());
}

// Exclui um usuário existente no servidor.
export async function delete_(id, url) {
	const userId = parseInt(id);

	// Envia uma requisição DELETE para a rota /users/{userId} do servidor.
	return fetch(url + `/users/${userId}`, {
		method: "DELETE"
	}).then(response => response.json());
}
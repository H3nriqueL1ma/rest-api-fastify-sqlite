import { create_, read_, update_, delete_ } from './routes/users.js'

const backendURL = "https://rest-api-fastify-sqlite.onrender.com/"

const $button = document.querySelector("#button");
const $table = document.querySelector("table");
const $input_name = document.querySelector("input#name");
const $input_profession = document.querySelector("input#profession");
const $input_birth = document.querySelector("input#birth");

$input_name.setAttribute("autocomplete", "off");
$input_profession.setAttribute("autocomplete", "off");
$input_birth.setAttribute("autocomplete", "off");

window.addEventListener("load", async () => {
	await loadUsers();
})

$button.addEventListener("click", async (event) => {
	event.preventDefault();

	if (!isNaN(Number($input_name.value)) || !isNaN(Number($input_profession.value))) {
		alert("[ERROR]: Não é possível colocar números no campo de Nome e Profissão!");
	} else {
		const user_name = $input_name ? $input_name.value.toString() : "";
		const user_profession = $input_profession ? $input_profession.value.toString() : "";
		const user_birthdate = $input_birth ? $input_birth.value.toString() : "";
	
		const data = [
			user_name,
			user_profession,
			user_birthdate
		];
	
		await create_(data, backendURL);
	
		await loadUsers();
	}
});

async function loadUsers() {
	$table.innerHTML = '';

	const users = await read_(null, backendURL);

	users.forEach((user) => {
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

		$table.appendChild(newRow);

		const $button_update = newRow.querySelector(".update");
		const $button_delete = newRow.querySelector(".delete");

		$button_update.addEventListener("click", () => {
			alert("Todas as edições são opcionais, ou seja, não é preciso completar todos os campos para atualizar, basta deixar em branco.");
			const name_updated = prompt("Novo Nome:");
			const profession_updated = prompt("Nova Profissão:");
			const birth_updated = prompt("Nova Data de Nascimento (Ex.: 2001-07-04):");
		  
			const regex = /^\d{4}-\d{2}-\d{2}$/;
		  
			if (hasNumbers(name_updated) || hasNumbers(profession_updated)) {
				  alert("[ERROR]: Não é possível colocar números no campo de Nome e Profissão!");
			} else if (birth_updated !== null && birth_updated !== "" && !regex.test(birth_updated)) {
				  alert("[ERROR]: Formato de data de nascimento inválido!");
			} else {
				  const updatedData = [
					name_updated !== null && name_updated !== "" ? name_updated : user.name,
					profession_updated !== null && profession_updated !== "" ? profession_updated : user.profession,
					birth_updated !== null && birth_updated !== "" ? birth_updated : user.birthdate
				  ];
		  
				update_(updatedData, user.id, backendURL).then((updatedUser) => {
					updateTableRow(newRow, updatedUser);
				});
			}
		  });
		  
		function hasNumbers(string) {
			return /\d/.test(string);
		}

		$button_delete.addEventListener("click", async () => {
			await delete_(user.id, backendURL);
			newRow.remove();
		});
	});
}

function updateTableRow(row, data) {
	const [idCell, nameCell, professionCell, birthdateCell] = row.cells;

	idCell.textContent = data.id;
	nameCell.textContent = data.name;
	professionCell.textContent = data.profession;
	birthdateCell.textContent = data.birthdate;
}
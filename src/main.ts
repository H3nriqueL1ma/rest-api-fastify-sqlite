/* eslint-disable @typescript-eslint/no-explicit-any */
import { create_, read_, update_, delete_ } from "./routes/users";

const $button: HTMLButtonElement | null = document.querySelector("#button");
const $table = document.querySelector("table");
const $input_name: HTMLInputElement = document.querySelector("input#name");
const $input_profession: HTMLInputElement = document.querySelector("input#profession");
const $input_birth: HTMLInputElement | null = document.querySelector("input#birth");

$input_name?.setAttribute("autocomplete", "off");
$input_profession?.setAttribute("autocomplete", "off");
$input_birth?.setAttribute("autocomplete", "off");

$button?.addEventListener("click", async (event) => {
	event.preventDefault();

	if (!isNaN(Number($input_name.value)) || !isNaN(Number($input_profession.value))) {
		alert("[ERROR]: Não é possível colocar números no campo de Nome e Profissão!");
	} else {
		const user_name = $input_name ? $input_name.value.toString() : "";
		const user_profession = $input_profession ? $input_profession.value.toString() : "";
		const user_birthdate = $input_birth ? $input_birth.value.toString() : "";
	
		const data: string[] = [
			user_name,
			user_profession,
			user_birthdate
		];
	
		await create_(data, "http://localhost:3333");
	
		const users = await read_(data[0], "http://localhost:3333");
	
		users.forEach((user: { id: string; name: string; profession: string; birthdate: string; }) => {
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
	
			$table?.appendChild(newRow);
	
			const $button_update: HTMLButtonElement | null = newRow.querySelector(".update");
			const $button_delete: HTMLButtonElement | null = newRow.querySelector(".delete");
	
			$button_update?.addEventListener("click", () => {
				alert("Todas as edições são opcionais, ou seja, não é preciso completar todos os campos para atualizar, basta deixar em branco.");
				const name_updated = prompt("Novo Nome:");
				const profession_updated = prompt("Nova Profissão:");
				const birth_updated = prompt("Nova Data de Nascimento:");
		
				const updatedData = [
					name_updated !== null && name_updated !== "" ? name_updated : user.name,
					profession_updated !== null && profession_updated !== "" ? profession_updated : user.profession,
					birth_updated !== null && birth_updated !== "" ? birth_updated : user.birthdate
				];
	
				update_(updatedData, user.id, "http://localhost:3333").then((updatedUser: any) => {
					updateTableRow(newRow, updatedUser);
				});
			});
	
			$button_delete?.addEventListener("click", async () => {
				await delete_(user.id, "http://localhost:3333");
				newRow.remove();
			});
		});
	}
});

function updateTableRow(row: HTMLTableRowElement, data: any) {
	const [idCell, nameCell, professionCell, birthdateCell] = row.cells;

	idCell.textContent = data.id;
	nameCell.textContent = data.name;
	professionCell.textContent = data.profession;
	birthdateCell.textContent = data.birthdate;
}
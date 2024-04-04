import fastify from "fastify";
import { prisma } from "./lib/prisma.js";
import cors from "@fastify/cors";

// Nova instância do Servidor.
const server = fastify();

// Habilita o CORS com uma origem específica.
server.register(cors, {
	origin: "*",
});

// Cadastra um novo usuário.
server.post("/users", async (request, reply) => {
	// Extrai nome, profissão e data de nascimento do corpo da requisição.
	const { name, profession, birthdate } = request.body
	// Cria um novo usuário no banco de dados usando o Prisma.
	const user = await prisma.users.create({
		data: {
			name: name,
			profession: profession,
			birthdate: birthdate
		}
	});

	// Envia o usuário criado como resposta.
	reply.send(user);
});

// Recupera o usuário com filtro opcional por nome.
server.get("/users", async (request, reply) => {
	// Extrai o parâmetro de consulta "name" da requisição.
	const { name } = request.query;

	// Recupera usuários do banco de dados usando o Prisma, com filtro opcional por nome.
	const users = await prisma.users.findMany({
		where: {
			name: name !== undefined ? name.toString() : undefined,
		},
		select: {
			id: true,
			name: true,
			profession: true,
			birthdate: true,
		},
	});

	// Envia os usuários recuperados como resposta.
	reply.send(users);
});

// Atualiza o usuário pelo ID.
server.put("/users/:id", async (request) => {
	// Extrai o ID do usuário dos parâmetros da requisição.
	const { id } = request.params;

	// Extrai nome, profissão e data de nascimento do corpo da requisição.
	const { name, profession, birthdate } = request.body

	// Converte o ID para o tipo inteiro.
	const userId = parseInt(id);

	// Atualiza o usuário no banco de dados usando o Prisma.
	const user = await prisma.users.update({
		where: {
			id: userId
		},
		data: {
			name: name,
			profession: profession,
			birthdate: birthdate
		}
	});

	// Envia o usuário atualizado como resposta.
	reply.send(user);
});

// Exclui um usuário pelo ID.
server.delete("/users/:id", async (request, reply) => {
	// Extrai o ID do usuário dos parâmetros da requisição.
	const { id } = request.params;

	// Converte o ID para o tipo inteiro.
	const userId = parseInt(id);

	// Exclui o usuário do banco de dados usando o Prisma.
	const user = await prisma.users.delete({
		where: {
			id: userId
		}
	});

	// Exclui o usuário do banco de dados usando o Prisma.
	reply.send(user);
});

// Inicia o servidor HTTP na porta 3333.
server.listen({port: 3333}).then(() => {
	console.log("HTTP server running (http://localhost:3333)");
});
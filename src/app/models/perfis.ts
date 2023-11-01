import { Perfil } from "./perfil";

export class Perfis {
	static list: Perfil[] = [
		{ codigo: "0", descricao: "Admin", selecionado: false },
		{ codigo: "1", descricao: "Cliente", selecionado: false },
		{ codigo: "2", descricao: "Técnico", selecionado: false },
	];

	static toList(perfis: string[]): void {
		perfis.forEach((perfil) => {
			if (perfil === "ADMIN") {
				this.list[0].selecionado = true;
			} else if (perfil === "CLIENTE") {
				this.list[1].selecionado = true;
			} else if (perfil === "TECNICO") {
				this.list[2].selecionado = true;
			}
		});
	}
}

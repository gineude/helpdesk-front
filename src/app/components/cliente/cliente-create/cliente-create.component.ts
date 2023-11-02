import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Perfil } from "src/app/models/perfil";
import { Perfis } from "src/app/models/perfis";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/service/cliente.service";
import { TituloService } from "src/app/service/titulo.service";
import { Validacao } from "src/app/validacao/validacao";

@Component({
	selector: "app-cliente-create",
	templateUrl: "./cliente-create.component.html",
	styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
	cliente: Cliente = {
		id: "",
		cpf: "",
		nome: "",
		email: "",
		senha: "",
		perfis: [],
		dataCriacao: "",
	};

	nome: FormControl = new FormControl(null, Validators.minLength(3));
	cpf: FormControl = new FormControl(
		null,
		Validators.compose([Validators.required, Validacao.CPF])
	);
	email: FormControl = new FormControl(null, Validators.email);
	senha: FormControl = new FormControl(null, Validators.minLength(3));

	perfis: Perfil[] = Perfis.list;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private service: ClienteService,
		private tituloService: TituloService
	) {}

	ngOnInit(): void {
		this.tituloService.titulo = "Cadastrar Cliente";
	}

	create(): void {
		this.separarPerfis();
		this.service.create(this.cliente).subscribe(
			(response) => {
				this.toastr.success(
					"Cliente cadastrado com sucesso!",
					"Cadastro"
				);
				this.router.navigate(["clientes"]);
			},
			(ex) => {
				if (ex.error.erros) {
					ex.error.errors.array.forEach((element) => {
						this.toastr.error(element.message);
					});
				} else {
					this.toastr.error(ex.error.message);
				}
			}
		);
	}

	private separarPerfis(): void {
		this.cliente.perfis = [];
		this.perfis.forEach(perfil => {
			if(perfil.selecionado) {
				this.cliente.perfis.push(perfil.codigo);
			}
		});
	}

	validaCampos(): boolean {
		return (
			this.nome.valid &&
			this.cpf.valid &&
			this.email.valid &&
			this.senha.valid
		);
	}
}

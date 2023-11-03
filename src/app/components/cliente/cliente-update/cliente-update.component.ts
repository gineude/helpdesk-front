import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Perfil } from "src/app/models/perfil";
import { Perfis } from "src/app/models/perfis";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/service/cliente.service";
import { TituloService } from "src/app/service/titulo.service";
import { Validacao } from "src/app/validacao/validacao";

@Component({
	selector: "app-cliente-update",
	templateUrl: "./cliente-update.component.html",
	styleUrls: ["./cliente-update.component.css"],
})
export class ClienteUpdateComponent implements OnInit {
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
		private tituloService: TituloService,
		private activeRouter: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.cliente.id = this.activeRouter.snapshot.paramMap.get("id");
		this.findById();
	}

	findById(): void {
		this.service.findById(this.cliente.id).subscribe((response) => {
			this.cliente.id = response.id;
			this.cliente.cpf = response.cpf;
			this.cliente.nome = response.nome;
			this.cliente.email = response.email;
			this.cliente.senha = response.senha;
			this.cliente.dataCriacao = response.dataCriacao;

			Perfis.toList(response.perfis);
			this.validaCampos();
		});
	}

	update(): void {
		this.separarPerfis();
		this.service.update(this.cliente).subscribe(
			(response) => {
				this.toastr.success(
					"Cliente atualizado com sucesso!",
					"Atualização"
				);
				this.router.navigate(["clientes"]);
			},
			(ex) => {
				if (ex.error && ex.error.erros) {
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

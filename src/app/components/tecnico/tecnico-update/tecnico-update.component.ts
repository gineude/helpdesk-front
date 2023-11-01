import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Perfil } from "src/app/models/perfil";
import { Perfis } from "src/app/models/perfis";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/service/tecnico.service";
import { TituloService } from "src/app/service/titulo.service";
import { Validacao } from "src/app/validacao/validacao";

@Component({
	selector: "app-tecnico-update",
	templateUrl: "./tecnico-update.component.html",
	styleUrls: ["./tecnico-update.component.css"],
})
export class TecnicoUpdateComponent implements OnInit {
	tecnico: Tecnico = {
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
		private service: TecnicoService,
		private tituloService: TituloService,
		private activeRouter: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.tituloService.titulo = "Atualizar Técnico";
		this.tecnico.id = this.activeRouter.snapshot.paramMap.get("id");
		this.findById();
	}

	findById(): void {
		this.service.findById(this.tecnico.id).subscribe((response) => {
			this.tecnico.id = response.id;
			this.tecnico.cpf = response.cpf;
			this.tecnico.nome = response.nome;
			this.tecnico.email = response.email;
			this.tecnico.senha = response.senha;
			this.tecnico.dataCriacao = response.dataCriacao;

			Perfis.toList(response.perfis);
			this.validaCampos();
		});
	}

	update(): void {
		this.separarPerfis();
		this.service.update(this.tecnico).subscribe(
			(response) => {
				this.toastr.success(
					"Técnico atualizado com sucesso!",
					"Atualização"
				);
				this.router.navigate(["tecnicos"]);
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
		this.tecnico.perfis = [];
		this.perfis.forEach(perfil => {
			if(perfil.selecionado) {
				this.tecnico.perfis.push(perfil.codigo);
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

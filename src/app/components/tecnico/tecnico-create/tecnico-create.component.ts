import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/service/tecnico.service";
import { TituloService } from "src/app/service/titulo.service";
import { Validacao } from "src/app/validacao/validacao";

@Component({
	selector: "app-tecnico-create",
	templateUrl: "./tecnico-create.component.html",
	styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
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

	constructor(
    private router: Router,
		private toastr: ToastrService,
		private service: TecnicoService,
		private tituloService: TituloService
	) {}

	ngOnInit(): void {
		this.tituloService.titulo = "Cadastrar Técnico";
	}

	create(): void {
		this.service.create(this.tecnico).subscribe(
			(response) => {
				this.toastr.success(
					"Técnico cadastrado com sucesso!",
					"Cadastro"
				);
          this.router.navigate(["tecnicos"]);
			},
			(ex) => {
        if(ex.error.erros) {
          ex.error.errors.array.forEach(element => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
			}
		);
	}

	addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.slice(this.tecnico.perfis.indexOf(perfil), 1);
		} else {
      this.tecnico.perfis.push(perfil);
    }
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

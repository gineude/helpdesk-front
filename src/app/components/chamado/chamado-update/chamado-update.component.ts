import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/service/chamado.service";
import { ClienteService } from "src/app/service/cliente.service";
import { TecnicoService } from "src/app/service/tecnico.service";

@Component({
	selector: "app-chamado-update",
	templateUrl: "./chamado-update.component.html",
	styleUrls: ["./chamado-update.component.css"],
})
export class ChamadoUpdateComponent implements OnInit {
	chamado: Chamado = {
		status: "",
		titulo: "",
		prioridade: "",
		nomeTecnico: "",
		nomeCliente: "",
		observacoes: "",
		tecnico: "",
		cliente: "",
	};

	tecnicos: Tecnico[] = [];
	clientes: Cliente[] = [];

	titulo: FormControl = new FormControl(null, Validators.required);
	status: FormControl = new FormControl(null, Validators.required);
	prioridade: FormControl = new FormControl(null, Validators.required);
	descricao: FormControl = new FormControl(null, Validators.required);
	tecnico: FormControl = new FormControl(null, Validators.required);
	cliente: FormControl = new FormControl(null, Validators.required);

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private activeRouter: ActivatedRoute,
		private chamadoService: ChamadoService,
		private clienteService: ClienteService,
		private tecnicoService: TecnicoService
	) {}

	ngOnInit(): void {
		this.tecnicoService.findAll().subscribe((response) => {
			this.tecnicos = response;
		});
		this.clienteService.findAll().subscribe((response) => {
			this.clientes = response;
		});
		this.chamado.id = this.activeRouter.snapshot.paramMap.get("id");
		this.findById();
	}

	update(): void {
		this.chamadoService.update(this.chamado).subscribe(
			(response) => {
				this.toastr.success(
					"Chamado atualizado com sucesso!",
					"Cadastro"
				);
				this.router.navigate(["chamados"]);
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

	findById(): void {
		this.chamadoService.findById(this.chamado.id).subscribe((response) => {
			this.chamado = response;
		});
	}

	validaCampos(): boolean {
		return (
			this.titulo.valid &&
			this.status.valid &&
			this.prioridade.valid &&
			this.descricao.valid &&
			this.tecnico.valid &&
			this.cliente.valid
		);
	}
}

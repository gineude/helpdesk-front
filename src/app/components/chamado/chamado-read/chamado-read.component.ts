import { Component, OnInit, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { DialogData } from "src/app/models/dialog-data";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/service/chamado.service";

@Component({
	selector: "app-chamado-read",
	templateUrl: "./chamado-read.component.html",
	styleUrls: ["./chamado-read.component.css"],
})
export class ChamadoReadComponent implements OnInit {
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

	titulo: FormControl = new FormControl(null);
	status: FormControl = new FormControl(null);
	prioridade: FormControl = new FormControl(null);
	tecnico: FormControl = new FormControl(null);
	cliente: FormControl = new FormControl(null);
	descricao: FormControl = new FormControl(null);

	constructor(
		private chamadoService: ChamadoService,
		private dialogRef: MatDialogRef<ChamadoReadComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

	ngOnInit(): void {
		this.chamado.id = this.data.id;
		this.findById();
	}

	findById(): void {
		this.chamadoService.findById(this.chamado.id).subscribe((response) => {
			this.chamado = response;
		});
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

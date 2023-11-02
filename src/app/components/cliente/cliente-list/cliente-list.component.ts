import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/service/cliente.service";
import { TituloService } from "src/app/service/titulo.service";
import { ConfirmaComponent } from "../../infra/confirma/confirma.component";

@Component({
	selector: "app-cliente-list",
	templateUrl: "./cliente-list.component.html",
	styleUrls: ["./cliente-list.component.css"],
})
export class ClienteListComponent implements OnInit {
	clienteList: Cliente[] = [];

	configPaginator: MatPaginatorIntl;
	displayedColumns: string[] = ["Id", "Nome", "CPF", "Email", "Ações"];
	dataSource = new MatTableDataSource<Cliente>(this.clienteList);

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private dialog: MatDialog,
		private service: ClienteService,
		private tituloService: TituloService
	) {}

	ngOnInit() {
		this.findAll();
		this.tituloService.titulo = "Listando Clientes";
	}

	findAll() {
		this.service.findAll().subscribe((response) => {
			this.clienteList = response;
			this.dataSource = new MatTableDataSource<Cliente>(response);
			this.dataSource.paginator = this.paginator;
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	setConfigPaginator(): void {
		this.configPaginator = new MatPaginatorIntl();
		this.configPaginator.firstPageLabel = "";
	}

	confirmDelete(id: any): void {
		const dialogRef = this.dialog.open(ConfirmaComponent, {
			data: {id: id, service: this.service},
		});

		dialogRef.afterClosed().subscribe(() => {
			this.findAll();
		});
	}
}

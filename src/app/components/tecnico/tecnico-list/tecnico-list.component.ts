import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/service/tecnico.service";
import { TituloService } from "src/app/service/titulo.service";

@Component({
	selector: "app-tecnico-list",
	templateUrl: "./tecnico-list.component.html",
	styleUrls: ["./tecnico-list.component.css"],
})
export class TecnicoListComponent implements OnInit {
	tecnicoList: Tecnico[] = [];

	configPaginator: MatPaginatorIntl;
	displayedColumns: string[] = ["Id", "Nome", "CPF", "Email", "Ações"];
	dataSource = new MatTableDataSource<Tecnico>(this.tecnicoList);

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private service: TecnicoService,
		private tituloService: TituloService
	) {}

	ngOnInit() {
		this.findAll();
		this.tituloService.titulo = "Listando Técnicos";
	}

	findAll() {
		this.service.findAll().subscribe((response) => {
			this.tecnicoList = response;
			this.dataSource = new MatTableDataSource<Tecnico>(response);
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
}

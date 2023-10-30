import { Component, OnInit } from '@angular/core';
import { TituloService } from 'src/app/service/titulo.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  constructor(private tituloService: TituloService) { }

  ngOnInit(): void {
    this.tituloService.titulo = "Cadastrar Técnico";
  }

}

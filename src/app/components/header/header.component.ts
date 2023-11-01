import { Component, AfterViewInit } from '@angular/core';
import { TituloService } from 'src/app/service/titulo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  titulo: string = '';

  constructor(private service: TituloService) { }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.titulo = this.service.titulo;
    });
  }

}

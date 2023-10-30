import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credencial } from 'src/app/models/credencial';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credencial = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(4));

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}

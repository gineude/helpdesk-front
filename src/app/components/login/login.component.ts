import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.toastr.error("Usuário e/ou senha inválidos", "Login")
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}

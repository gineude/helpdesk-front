import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credencial } from 'src/app/models/credencial';
import { AuthService } from 'src/app/service/auth.service';

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
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.authenticate(this.creds).subscribe((response) => {
      this.authService.successfulLogin(response.headers.get("Authorization").substring(7));
      this.toastr.info("Login realizado com sucesso!");
      this.router.navigate([""]);
      }, () => {
        this.toastr.error("Usuário e/ou senha inválidos!");
    });
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}

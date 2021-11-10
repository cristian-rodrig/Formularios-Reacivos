import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  emailPattern,
  nombreApellidoPattern,
  noPuedeSerStrider,
} from 'src/app/shared/validator/validaciones';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Cristian Rodriguez',
      email: 'test1@test.com',
      username: 'ctridente',
      password: '123456',
      password2: '123456',
    });
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'El email es obligatorio';
    } else if (errors?.pattern) {
      return 'El campo email no tiene un formato valido';
    } else if (errors?.eMailTomado) {
      return 'El email ingresado ya existe';
    }
    return '';
  }

  campoInvalido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  // emailRequired() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.required &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  // emailTomado() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.eMailTomado &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  // emailPattern() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.pattern &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  submitFormulario() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}

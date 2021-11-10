import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.requiredTrue],
    condiciones: [false, Validators.requiredTrue],
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.reset({ ...this.persona, condiciones: true });

    // this.miFormulario.controls['condiciones'].valueChanges.subscribe(
    //   (condiciones) => {
    //     console.log(condiciones);
    //   }
    // ); //Manera normal

    this.miFormulario.valueChanges.subscribe(({ condiciones, ...restArg }) => {
      // destructurando se elimina condiciones y se envia el resto de los argum
      this.persona = restArg;
      console.log(restArg);
    });
  }

  guardar() {
    const formValue = { ...this.miFormulario.value };
    delete formValue.condiciones;
    this.persona = formValue;
    console.log(formValue);
  }
}

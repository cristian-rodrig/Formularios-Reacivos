import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  constructor(private fb: FormBuilder) {}

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['The stranding', Validators.required],
      ],
      Validators.required
    ),
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosFormArray() {
    return <FormArray>this.miFormulario.get('favoritos');
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    } else if (this.miFormulario) {
      console.log(this.miFormulario.value);
    }
  }

  campoInvalido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) return;
    this.favoritosFormArray.push(
      new FormControl(this.nuevoFavorito.value, Validators.required)
    );
    // this.favoritosFormArray.push(this.fb.control(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  borrar(index: number): void {
    this.favoritosFormArray.removeAt(index);
  }
}

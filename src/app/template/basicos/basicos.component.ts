import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  valorInicialForm = {
    producto: 'RTX 3060ti',
    precio: 1150,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    //console.log(this.miFormulario);
    this.miFormulario.resetForm({
      producto: '',
      precio: 0,
      existencias: 0
    });
  }

  productoValido():boolean{
    return this.miFormulario?.controls.producto?.invalid && this.miFormulario?.controls.producto?.touched
  }
  precioValido():boolean{
    return this.miFormulario?.controls.precio?.touched && this.miFormulario?.controls.precio?.value < 1;
  }

}

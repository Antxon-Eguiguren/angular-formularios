import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/),
      ]),
      edad: new FormControl('', [
        Validators.required,
        this.edadValidator,
      ]),
      dni: new FormControl('', [
        Validators.required,
        this.dniValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        // Password must be between 4 and 8 digits long and include at least one numeric digit.
        Validators.pattern(/^(?=.*\d).{4,8}$/),
      ]),
      repite_password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/),
      ]),
    }, [this.passwordValidator]);
  }

  ngOnInit() {
    const controlEmail = this.formulario.controls.email;
    // Me suscribo a los cambios del campo con un retardo de 1 segundo, para no saturar el servidor en cada cambio que se da en el campo
    controlEmail.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      // Aquí validaríamos con la BBDD si el email ya existe, para no enviar el formulario hasta que el email sea nuevo
      console.log(value);
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
  }

  // Validador personalizado para comprobar si la edad está entre 18 y 65 años.
  edadValidator(control) {
    const edadValue = control.value;
    const maxValue = 65;
    const minValue = 18;
    if (edadValue >= minValue && edadValue <= maxValue) {
      // Devuelvo null porque no hay error
      return null;
    } else {
      // Devuelvo algo diferente a null (que significa que es un error) y devuelvo un objeto con la edad min y edad max para usarlos en el mensaje de error
      return { edadvalidator: { max: maxValue, min: minValue } };
    }
  }

  // https://donnierock.com/2011/11/05/validar-un-dni-con-javascript/
  dniValidator(control) {
    const dni = control.value;
    const expresionRegularDni = /^\d{8}[a-zA-Z]$/;

    if (expresionRegularDni.test(dni) === true) {
      let numero = dni.substring(0, dni.length - 1);
      const letr = dni.charAt(dni.length - 1);
      numero = numero % 23;
      let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
      letra = letra.substring(numero, numero + 1);

      if (letra !== letr.toUpperCase()) {
        return { dnivalidator: { msg: 'La letra es incorrecta.' } };
      } else {
        return null;
      }
    } else {
      return { dnivalidator: { msg: 'El formato no es válido.' } };
    }
  }

  // Validador a nivel de formulario que comprueba que dos campos del formulario son iguales
  passwordValidator(form) {
    const passwordValue = form.controls.password.value;
    const repitePasswordValue = form.controls.repite_password.value;

    if (passwordValue === repitePasswordValue) {
      return null;
    } else {
      return { passwordvalidator: true };
    }
  }

}

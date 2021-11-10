import { FormControl } from '@angular/forms';

export const nombreApellidoPattern: string = '([A-Za-z]+) ([A-Za-z]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const noPuedeSerStrider = (control: FormControl) => {
  const valor: string = control.value?.trim().toLowerCase();
  if (valor === 'strider') {
    return {
      noStrider: true,
    };
  }
  return null;
};

/**
 * PATRÓN ABSTRACT FACTORY
 * 
 * Explicación:
 * El Abstract Factory proporciona una interfaz para crear familias de objetos
 * relacionados sin especificar sus clases concretas.
 * 
 * Caso de uso: Crear interfaces de usuario para diferentes sistemas operativos,
 *             crear productos de diferentes fabricantes
 */

// Familia 1: Botones
interface Button {
  render(): string;
}

class WindowsButton implements Button {
  render(): string {
    return "Rendering Windows Button";
  }
}

class MacButton implements Button {
  render(): string {
    return "Rendering Mac Button";
  }
}

// Familia 2: Cajas de selección
interface Checkbox {
  render(): string;
}

class WindowsCheckbox implements Checkbox {
  render(): string {
    return "Rendering Windows Checkbox";
  }
}

class MacCheckbox implements Checkbox {
  render(): string {
    return "Rendering Mac Checkbox";
  }
}

// Abstract Factory
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Implementaciones concretas de la factory
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Cliente que utiliza la Abstract Factory
class ApplicationUI {
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  render(): void {
    console.log(this.button.render());
    console.log(this.checkbox.render());
  }
}

// Ejemplo de uso
console.log("=== ABSTRACT FACTORY PATTERN ===\n");

console.log("Creating Windows UI:");
let app = new ApplicationUI(new WindowsFactory());
app.render();

console.log("\nCreating Mac UI:");
app = new ApplicationUI(new MacFactory());
app.render();

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Se pueden agregar nuevas familias (ej. LinuxFactory) sin
//     modificar el código cliente ni las famílias existentes.
//   - D (Dependency Inversion): ApplicationUI depende de GUIFactory (interfaz),
//     Button e ICheckbox (interfaces), nunca de clases concretas.
//   - I (Interface Segregation): Las interfaces Button y Checkbox están separadas
//     por responsabilidad, el cliente solo usa lo que necesita.
//   - L (Liskov Substitution): WindowsFactory y MacFactory son intercambiables
//     entre sí al implementar la misma interfaz GUIFactory.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - O (Open/Closed): Agregar un NUEVO TIPO de producto (ej. TextField) obliga
//     a modificar la interfaz GUIFactory Y todas las fábricas concretas existentes.
//   - S (Single Responsibility): Cada fábrica concreta tiene el conocimiento
//     de cómo crear todos los productos de su familia.

/**
 * PATRÓN DECORATOR
 * 
 * Explicación:
 * El Decorator permite extender la funcionalidad de un objeto dinámicamente
 * sin modificar su estructura original. Proporciona una alternativa flexible
 * a la herencia.
 * 
 * Caso de uso: Agregar características a objetos existentes, sistema de
 *             permisos/roles, formateo dinámico de texto, precios con impuestos
 */

// Interfaz para componentes
interface Component {
  getDescription(): string;
  getPrice(): number;
}

// Componente concreto base
class Pizza implements Component {
  getDescription(): string {
    return "Pizza";
  }

  getPrice(): number {
    return 10;
  }
}

// Clase abstracta decorador
abstract class PizzaDecorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  abstract getDescription(): string;

  getPrice(): number {
    return this.component.getPrice();
  }
}

// Decoradores concretos
class CheeseDecorator extends PizzaDecorator {
  getDescription(): string {
    return this.component.getDescription() + ", Cheese";
  }

  getPrice(): number {
    return this.component.getPrice() + 2;
  }
}

class PepperoniDecorator extends PizzaDecorator {
  getDescription(): string {
    return this.component.getDescription() + ", Pepperoni";
  }

  getPrice(): number {
    return this.component.getPrice() + 3;
  }
}

class VegetablesDecorator extends PizzaDecorator {
  getDescription(): string {
    return this.component.getDescription() + ", Vegetables";
  }

  getPrice(): number {
    return this.component.getPrice() + 2.5;
  }
}

class BaconDecorator extends PizzaDecorator {
  getDescription(): string {
    return this.component.getDescription() + ", Bacon";
  }

  getPrice(): number {
    return this.component.getPrice() + 3.5;
  }
}

// Ejemplo de uso
console.log("=== DECORATOR PATTERN ===\n");

// Crear una pizza base
let pizza: Component = new Pizza();
console.log(`${pizza.getDescription()}: $${pizza.getPrice()}`);

// Agregar decoradores dinámicamente
pizza = new CheeseDecorator(pizza);
console.log(`${pizza.getDescription()}: $${pizza.getPrice()}`);

pizza = new PepperoniDecorator(pizza);
console.log(`${pizza.getDescription()}: $${pizza.getPrice()}`);

pizza = new VegetablesDecorator(pizza);
console.log(`${pizza.getDescription()}: $${pizza.getPrice()}`);

pizza = new BaconDecorator(pizza);
console.log(`${pizza.getDescription()}: $${pizza.getPrice()}`);

console.log("\n--- Creating different pizza combination ---");

let anotherPizza: Component = new Pizza();
anotherPizza = new VegetablesDecorator(anotherPizza);
anotherPizza = new CheeseDecorator(anotherPizza);
console.log(`${anotherPizza.getDescription()}: $${anotherPizza.getPrice()}`);

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevas características se agregan añadiendo un nuevo
//     decorador sin modificar Pizza ni los decoradores existentes.
//   - S (Single Responsibility): Cada decorador (CheeseDecorator, BaconDecorator)
//     tiene una única responsabilidad: agregar su propio ingrediente y precio.
//   - L (Liskov Substitution): Cualquier decorador puede sustituir al componente
//     base porque implementa la misma interfaz Component.
//   - D (Dependency Inversion): PizzaDecorator depende de la interfaz Component,
//     no de la clase concreta Pizza.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): La clase abstracta PizzaDecorator obliga a
//     implementar getDescription() aunque el decorador podría solo modificar
//     el precio (y viceversa), forzando implementaciones triviales.

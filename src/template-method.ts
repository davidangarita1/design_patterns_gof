/**
 * PATRÓN TEMPLATE METHOD
 * 
 * Explicación:
 * El Template Method define el esqueleto de un algoritmo en una clase base,
 * dejando detalles para que la subclases las proporcionen. Permite que las
 * subclases sobrescriban pasos específicos sin cambiar la estructura del algoritmo.
 * 
 * Caso de uso: Procesamiento de reportes, ciclo de vida de aplicaciones,
 *             algoritmos de juegos, compiladores
 */

// Clase abstracta que define el algoritmo
abstract class CoffeeRecipe {
  // Template Method
  prepareCoffee(): void {
    console.log("\n--- Preparing Coffee ---");
    this.boilWater();
    this.brewCoffee();
    this.addToppings();
    this.serveCoffee();
    console.log("Enjoy your coffee!\n");
  }

  private boilWater(): void {
    console.log("1️⃣  Boiling water");
  }

  protected abstract brewCoffee(): void;

  protected abstract addToppings(): void;

  private serveCoffee(): void {
    console.log("4️⃣  Serving coffee");
  }
}

// Implementaciones concretas
class AmericanoCoffee extends CoffeeRecipe {
  protected brewCoffee(): void {
    console.log("2️⃣  Adding ground coffee to filter");
  }

  protected addToppings(): void {
    console.log("3️⃣  No toppings for Americano");
  }
}

class LatteCoffee extends CoffeeRecipe {
  protected brewCoffee(): void {
    console.log("2️⃣  Brewing espresso");
  }

  protected addToppings(): void {
    console.log("3️⃣  Adding steamed milk and foam");
  }
}

class CapuccinoCoffee extends CoffeeRecipe {
  protected brewCoffee(): void {
    console.log("2️⃣  Brewing strong espresso");
  }

  protected addToppings(): void {
    console.log("3️⃣  Adding equal parts steamed milk and foam");
  }
}

class MocaCoffee extends CoffeeRecipe {
  protected brewCoffee(): void {
    console.log("2️⃣  Brewing espresso with chocolate");
  }

  protected addToppings(): void {
    console.log("3️⃣  Adding milk, whipped cream, and chocolate syrup");
  }
}

// Patrón Template Method con hooks opcionales
abstract class DataProcessor {
  // Template method
  processData(data: string[]): void {
    console.log("\n--- Starting Data Processing ---");
    this.openFile();
    this.readData(data);
    if (this.shouldValidate()) {
      this.validateData(data);
    }
    this.transformData(data);
    if (this.shouldOptimize()) {
      this.optimizeData(data);
    }
    this.saveData(data);
    this.closeFile();
    console.log("--- Data Processing Complete ---\n");
  }

  protected openFile(): void {
    console.log("📂 Opening file");
  }

  protected readData(data: string[]): void {
    console.log(`📖 Reading ${data.length} records`);
  }

  protected shouldValidate(): boolean {
    return true; // Hook: puede ser sobrescrito
  }

  protected validateData(data: string[]): void {
    console.log("[OK] Validating data");
  }

  protected abstract transformData(data: string[]): void;

  protected shouldOptimize(): boolean {
    return false; // Hook: puede ser sobrescrito
  }

  protected optimizeData(data: string[]): void {
    console.log("⚡ Optimizing data");
  }

  protected abstract saveData(data: string[]): void;

  protected closeFile(): void {
    console.log("📄 Closing file");
  }
}

class CSVProcessor extends DataProcessor {
  protected transformData(data: string[]): void {
    console.log("CSV: Transforming records to CSV format");
  }

  protected saveData(data: string[]): void {
    console.log("CSV: Saving to .csv file");
  }

  protected shouldOptimize(): boolean {
    return true; // Este procesador sí optimiza
  }
}

class JSONProcessor extends DataProcessor {
  protected transformData(data: string[]): void {
    console.log("JSON: Transforming records to JSON format");
  }

  protected saveData(data: string[]): void {
    console.log("JSON: Saving to .json file");
  }

  protected shouldValidate(): boolean {
    return true;
  }
}

// Ejemplo de uso
console.log("=== TEMPLATE METHOD PATTERN ===\n");

console.log("=== Coffee Recipes ===");
const americano = new AmericanoCoffee();
americano.prepareCoffee();

const latte = new LatteCoffee();
latte.prepareCoffee();

const cappuccino = new CapuccinoCoffee();
cappuccino.prepareCoffee();

const moca = new MocaCoffee();
moca.prepareCoffee();

console.log("\n=== Data Processing ===");
const csvProcessor = new CSVProcessor();
csvProcessor.processData(["record1", "record2", "record3"]);

const jsonProcessor = new JSONProcessor();
jsonProcessor.processData(["user1", "user2"]);

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevas implementaciones del algoritmo (ej. XMLProcessor)
//     se agregan subclasificando sin modificar la estructura del template method.
//   - L (Liskov Substitution): Subclases como CSVProcessor y JSONProcessor pueden
//     sustituir a DataProcessor sin alterar el comportamiento del algoritmo.
//   - S (Single Responsibility): La clase abstracta define el esqueleto del
//     algoritmo; cada subclase define solo sus pasos específicos.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - D (Dependency Inversion): Las subclases dependen directamente de la clase
//     abstracta (herencia concreta), no de una interfaz. Si el template method
//     cambia, todas las subclases se ven afectadas.
//   - I (Interface Segregation): Las subclases deben implementar TODOS los
//     métodos abstractos (transformData, saveData), aunque alguno no sea
//     relevante para cierta implementación.
//   - O (Open/Closed): Modificar el template method (el orden de los pasos del
//     algoritmo) en la clase abstracta afecta de golpe a todas las subclases,
//     violando el espíritu de OCP para la propia clase base.

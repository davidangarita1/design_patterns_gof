/**
 * PATRÓN BUILDER
 * 
 * Explicación:
 * El Builder permite construir objetos complejos paso a paso. Separa la
 * construcción de un objeto de su representación, permitiendo el mismo
 * proceso de construcción para crear diferentes representaciones.
 * 
 * Caso de uso: Crear objetos con muchos parámetros opcionales, como
 *             configuraciones de aplicaciones o construcción de consultas SQL
 */

// Clase compleja que necesita constructor
class HousePlan {
  public windows?: number;
  public doors?: number;
  public rooms?: number;
  public hasGarage?: boolean;
  public hasSwimmingPool?: boolean;
  public wallMaterial?: string;

  constructor() {
    this.windows = 0;
    this.doors = 0;
    this.rooms = 0;
    this.hasGarage = false;
    this.hasSwimmingPool = false;
    this.wallMaterial = "Brick";
  }

  displayInfo(): void {
    console.log(`House Plan:
      - Windows: ${this.windows}
      - Doors: ${this.doors}
      - Rooms: ${this.rooms}
      - Garage: ${this.hasGarage}
      - Swimming Pool: ${this.hasSwimmingPool}
      - Wall Material: ${this.wallMaterial}`);
  }
}

// Builder para construir la casa
class HouseBuilder {
  private house: HousePlan;

  constructor() {
    this.house = new HousePlan();
  }

  buildWindows(count: number): HouseBuilder {
    this.house.windows = count;
    return this;
  }

  buildDoors(count: number): HouseBuilder {
    this.house.doors = count;
    return this;
  }

  buildRooms(count: number): HouseBuilder {
    this.house.rooms = count;
    return this;
  }

  buildGarage(): HouseBuilder {
    this.house.hasGarage = true;
    return this;
  }

  buildSwimmingPool(): HouseBuilder {
    this.house.hasSwimmingPool = true;
    return this;
  }

  buildWallMaterial(material: string): HouseBuilder {
    this.house.wallMaterial = material;
    return this;
  }

  build(): HousePlan {
    // Retorna el producto y reinicia el builder para permitir reutilización segura
    const product = this.house;
    this.reset();
    return product;
  }

  private reset(): void {
    this.house = new HousePlan();
  }
}

// Ejemplo de uso
console.log("=== BUILDER PATTERN ===\n");

console.log("Building a simple house:");
const simpleHouse = new HouseBuilder()
  .buildWindows(4)
  .buildDoors(2)
  .buildRooms(3)
  .build();
simpleHouse.displayInfo();

console.log("\nBuilding a luxury house:");
const luxuryHouse = new HouseBuilder()
  .buildWindows(12)
  .buildDoors(6)
  .buildRooms(8)
  .buildGarage()
  .buildSwimmingPool()
  .buildWallMaterial("Marble")
  .build();
luxuryHouse.displayInfo();

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - S (Single Responsibility): HousePlan solo representa los datos de la casa;
//     HouseBuilder solo se encarga de la construcción paso a paso.
//   - O (Open/Closed): Se pueden crear nuevos builders para diferentes tipos de
//     casas sin modificar HousePlan ni los builders existentes.
//   - D (Dependency Inversion): Un Director (si existiera) dependeria de la
//     interfaz abstracta Builder, no de tipos concretos.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - O (Open/Closed): Agregar una nueva propiedad a HousePlan puede requerir
//     modificar el Builder para exponer ese paso de construcción.
//   - I (Interface Segregation): Si multiples builders implementan la misma
//     interfaz, algunos pueden verse forzados a implementar pasos irrelevantes.
//   - L (Liskov Substitution): No aplica directamente en este ejemplo sin
//     jerarquía de builders, pero subclases deben respetar el contrato de reset.

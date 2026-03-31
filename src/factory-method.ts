/**
 * PATRÓN FACTORY METHOD
 * 
 * Explicación:
 * El Factory Method define una interfaz para crear objetos, pero deja que
 * las subclases decidan qué clase instanciar. Esto permite delegar la
 * lógica de creación a las subclases.
 * 
 * Caso de uso: Creación de diferentes tipos de transporte, documentos, conexiones
 */

// Interfaz para transportes
interface Transport {
  deliver(): string;
}

// Implementaciones concretas
class Truck implements Transport {
  deliver(): string {
    return "Goods delivered by truck on land";
  }
}

class Ship implements Transport {
  deliver(): string {
    return "Goods delivered by ship on sea";
  }
}

class Plane implements Transport {
  deliver(): string {
    return "Goods delivered by plane in air";
  }
}

// Clase abstracta con el Factory Method
abstract class Logistics {
  // Factory Method abstracto
  abstract createTransport(): Transport;

  // Método que utiliza el Factory Method
  public planDelivery(): string {
    const transport = this.createTransport();
    return transport.deliver();
  }
}

// Implementaciones concretas del Factory
class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

class AirLogistics extends Logistics {
  createTransport(): Transport {
    return new Plane();
  }
}

// Ejemplo de uso
console.log("=== FACTORY METHOD PATTERN ===\n");

const roadLogistics: Logistics = new RoadLogistics();
console.log("Road:", roadLogistics.planDelivery());

const seaLogistics: Logistics = new SeaLogistics();
console.log("Sea:", seaLogistics.planDelivery());

const airLogistics: Logistics = new AirLogistics();
console.log("Air:", airLogistics.planDelivery());

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - O (Open/Closed): Se pueden agregar nuevos tipos de transporte (ej. Drone)
//     creando una nueva subclase sin modificar ningún código existente.
//   - L (Liskov Substitution): Cualquier subclase de Logistics puede sustituir
//     a otra sin romper el comportamiento del cliente.
//   - D (Dependency Inversion): El cliente trabaja contra la interfaz Transport
//     y la clase abstracta Logistics, no contra implementaciones concretas.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - S (Single Responsibility): La clase abstracta Logistics mezcla la lógica
//     de negocio (planDelivery) con la responsabilidad de creación de objetos.
//   - I (Interface Segregation): Si la interfaz Transport crece con métodos
//     específicos, las subclases se ven forzadas a implementar lo que no usan.

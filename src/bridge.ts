/**
 * PATRÓN BRIDGE
 * 
 * Explicación:
 * El Bridge desacopla una abstracción de su implementación para que ambas
 * puedan variar independientemente. Crea un puente entre abstracciones e
 * implementaciones.
 * 
 * Caso de uso: Sistemas multiplataforma, drivers de dispositivos, APIs de
 *             bases de datos que soportan múltiples proveedores
 */

// Implementador: Define la interfaz para la implementación
interface DrawingAPI {
  drawCircle(radius: number): void;
  drawRectangle(width: number, height: number): void;
}

// Implementaciones concretas
class WindowsDrawingAPI implements DrawingAPI {
  drawCircle(radius: number): void {
    console.log(`Drawing circle with radius ${radius} using Windows API`);
  }

  drawRectangle(width: number, height: number): void {
    console.log(`Drawing rectangle ${width}x${height} using Windows API`);
  }
}

class LinuxDrawingAPI implements DrawingAPI {
  drawCircle(radius: number): void {
    console.log(`Drawing circle with radius ${radius} using Linux API`);
  }

  drawRectangle(width: number, height: number): void {
    console.log(`Drawing rectangle ${width}x${height} using Linux API`);
  }
}

class MacDrawingAPI implements DrawingAPI {
  drawCircle(radius: number): void {
    console.log(`Drawing circle with radius ${radius} using Mac API`);
  }

  drawRectangle(width: number, height: number): void {
    console.log(`Drawing rectangle ${width}x${height} using Mac API`);
  }
}

// Abstracción: Define la interfaz de alto nivel
abstract class BridgeShape {
  protected drawingAPI: DrawingAPI;

  constructor(drawingAPI: DrawingAPI) {
    this.drawingAPI = drawingAPI;
  }

  abstract draw(): void;
}

// Abstracciones refinadas
class BridgeCircle extends BridgeShape {
  private radius: number;

  constructor(radius: number, drawingAPI: DrawingAPI) {
    super(drawingAPI);
    this.radius = radius;
  }

  draw(): void {
    this.drawingAPI.drawCircle(this.radius);
  }
}

class BridgeRectangle extends BridgeShape {
  private width: number;
  private height: number;

  constructor(width: number, height: number, drawingAPI: DrawingAPI) {
    super(drawingAPI);
    this.width = width;
    this.height = height;
  }

  draw(): void {
    this.drawingAPI.drawRectangle(this.width, this.height);
  }
}

// Retorna el tipo correcto de Shape refinada
function getShapes(api: DrawingAPI): BridgeShape[] {
  return [ new BridgeCircle(5, api), new BridgeRectangle(10, 20, api) ];
}

// Ejemplo de uso
console.log("=== BRIDGE PATTERN ===\n");

console.log("Drawing on Windows:");
let shape: BridgeShape = new BridgeCircle(5, new WindowsDrawingAPI());
shape.draw();
shape = new BridgeRectangle(10, 20, new WindowsDrawingAPI());
shape.draw();

console.log("\nDrawing on Linux:");
shape = new BridgeCircle(3, new LinuxDrawingAPI());
shape.draw();
shape = new BridgeRectangle(15, 25, new LinuxDrawingAPI());
shape.draw();

console.log("\nDrawing on Mac:");
shape = new BridgeCircle(7, new MacDrawingAPI());
shape.draw();

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Abstracciones (Circle, Rectangle) e implementaciones
//     (WindowsAPI, LinuxAPI) pueden extenderse independientemente sin modificar
//     el otro lado del puente.
//   - D (Dependency Inversion): Shape (abstracción de alto nivel) depende de
//     DrawingAPI (interfaz), no de implementaciones concretas como WindowsDrawingAPI.
//   - S (Single Responsibility): Shape define la geometría; DrawingAPI define
//     el mecanismo de renderizado. Dos razones de cambio separadas.
//   - L (Liskov Substitution): Cualquier DrawingAPI concreta puede sustituir a
//     otra al implementar la misma interfaz sin romper las formas.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): Si DrawingAPI crece con métodos muy específicos
//     (ej. drawArrow), implementaciones que no la soportan deben implementarla
//     igual, violando ISP.
//   - S (Single Responsibility): La clase abstracta Shape une la responsabilidad
//     de la geometría con la referencia al implementador, acoplando ambas capas.

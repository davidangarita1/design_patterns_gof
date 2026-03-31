/**
 * PATRÓN VISITOR
 * 
 * Explicación:
 * El Visitor te permite definir nuevas operaciones sin cambiar las clases de
 * los elementos sobre los que operan. Separa los algoritmos de los objetos sobre
 * los cuales actúan.
 * 
 * Caso de uso: Compiladores, análisis de AST, exportadores de documentos,
 *             análisis de viajeros en estructuras de datos complejas
 */

// Elemento que acepta visitantes
interface Element {
  accept(visitor: Visitor): void;
}

// Interfaz para visitantes
interface Visitor {
  visitCircle(circle: VisitorCircle): void;
  visitRectangle(rectangle: VisitorRectangle): void;
  visitTriangle(triangle: VisitorTriangle): void;
}

// Elementos concretos
class VisitorCircle implements Element {
  constructor(public readonly radius: number) {}

  accept(visitor: Visitor): void {
    visitor.visitCircle(this);
  }
}

class VisitorRectangle implements Element {
  constructor(
    public readonly width: number,
    public readonly height: number
  ) {}

  accept(visitor: Visitor): void {
    visitor.visitRectangle(this);
  }
}

class VisitorTriangle implements Element {
  constructor(
    public readonly side1: number,
    public readonly side2: number,
    public readonly side3: number
  ) {}

  accept(visitor: Visitor): void {
    visitor.visitTriangle(this);
  }
}

// Visitantes concretos
class AreaCalculator implements Visitor {
  private totalArea: number = 0;

  visitCircle(circle: VisitorCircle): void {
    const area = Math.PI * circle.radius * circle.radius;
    this.totalArea += area;
    console.log(`Circle area: ${area.toFixed(2)}`);
  }

  visitRectangle(rectangle: VisitorRectangle): void {
    const area = rectangle.width * rectangle.height;
    this.totalArea += area;
    console.log(`Rectangle area: ${area}`);
  }

  visitTriangle(triangle: VisitorTriangle): void {
    // Usando la fórmula de Herón
    const s = (triangle.side1 + triangle.side2 + triangle.side3) / 2;
    const area = Math.sqrt(s * (s - triangle.side1) * (s - triangle.side2) * (s - triangle.side3));
    this.totalArea += area;
    console.log(`Triangle area: ${area.toFixed(2)}`);
  }

  getTotalArea(): number {
    return this.totalArea;
  }
}

class PerimeterCalculator implements Visitor {
  private totalPerimeter: number = 0;

  visitCircle(circle: VisitorCircle): void {
    const perimeter = 2 * Math.PI * circle.radius;
    this.totalPerimeter += perimeter;
    console.log(`Circle perimeter: ${perimeter.toFixed(2)}`);
  }

  visitRectangle(rectangle: VisitorRectangle): void {
    const perimeter = 2 * (rectangle.width + rectangle.height);
    this.totalPerimeter += perimeter;
    console.log(`Rectangle perimeter: ${perimeter}`);
  }

  visitTriangle(triangle: VisitorTriangle): void {
    const perimeter = triangle.side1 + triangle.side2 + triangle.side3;
    this.totalPerimeter += perimeter;
    console.log(`Triangle perimeter: ${perimeter}`);
  }

  getTotalPerimeter(): number {
    return this.totalPerimeter;
  }
}

class ShapeRenderer implements Visitor {
  visitCircle(circle: VisitorCircle): void {
    console.log(`[CIRCLE] Drawing circle with radius ${circle.radius}`);
  }

  visitRectangle(rectangle: VisitorRectangle): void {
    console.log(`[RECTANGLE] Drawing rectangle ${rectangle.width}x${rectangle.height}`);
  }

  visitTriangle(triangle: VisitorTriangle): void {
    console.log(`[TRIANGLE] Drawing triangle with sides ${triangle.side1}, ${triangle.side2}, ${triangle.side3}`);
  }
}

// Cliente
class ShapeCollection {
  private shapes: Element[] = [];

  addShape(shape: Element): void {
    this.shapes.push(shape);
  }

  accept(visitor: Visitor): void {
    this.shapes.forEach((shape) => shape.accept(visitor));
  }
}

// Ejemplo de uso
console.log("=== VISITOR PATTERN ===\n");

const shapes = new ShapeCollection();
shapes.addShape(new VisitorCircle(5));
shapes.addShape(new VisitorRectangle(10, 20));
shapes.addShape(new VisitorTriangle(3, 4, 5));

console.log("--- Calculating Areas ---");
const areaCalculator = new AreaCalculator();
shapes.accept(areaCalculator);
console.log(`Total Area: ${areaCalculator.getTotalArea().toFixed(2)}\n`);

console.log("--- Calculating Perimeters ---");
const perimeterCalculator = new PerimeterCalculator();
shapes.accept(perimeterCalculator);
console.log(`Total Perimeter: ${perimeterCalculator.getTotalPerimeter().toFixed(2)}\n`);

console.log("--- Rendering Shapes ---");
const renderer = new ShapeRenderer();
shapes.accept(renderer);

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevas operaciones (ej. SerializerVisitor, ExporterVisitor)
//     se agregan creando un nuevo Visitor sin modificar Circle, Rectangle
//     ni Triangle.
//   - S (Single Responsibility): La lógica de cálculo de área está en
//     AreaCalculator, la de perímetro en PerimeterCalculator. Cada visitante
//     tiene una sola responsabilidad.
//   - D (Dependency Inversion): Los elementos dependen de la interfaz Visitor;
//     los visitantes dependen de la interfaz Element.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - O (Open/Closed): Agregar un NUEVO TIPO de elemento (ej. Pentagon) rompe
//     el OCP porque obliga a modificar TODOS los visitantes existentes para
//     añadir visitPentagon(). Es la mayor debilidad del patrón.
//   - D (Dependency Inversion): Los visitantes concretos (AreaCalculator, etc.)
//     dependen de los tipos concretos de elementos (Circle, Rectangle, Triangle),
//     no de abstracciones. Esto crea un fuerte acoplamiento estructural.
//   - I (Interface Segregation): La interfaz Visitor obliga a implementar un
//     método por cada tipo de elemento, incluso si el visitante solo necesita
//     tratar un subconjunto de ellos.

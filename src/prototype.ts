/**
 * PATRÓN PROTOTYPE
 * 
 * Explicación:
 * El Prototype permite crear nuevos objetos copiando un objeto existente
 * (prototipo) en lugar de crear uno desde cero. Esto es útil cuando la
 * creación de un objeto es costosa.
 * 
 * Caso de uso: Clonar documentos, copiar configuraciones complejas, duplicar objetos
 */

// Interfaz Prototype genérica (requisito GoF: el cliente trabaja contra esta interfaz)
interface Prototype<T> {
  clone(): T;
}

// Clase que puede ser clonada
class Shape implements Prototype<Shape> {
  public name: string;
  public color: string;
  public x: number;
  public y: number;

  constructor(name: string, color: string, x: number, y: number) {
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  // Método para crear un clon profundo
  clone(): Shape {
    return new Shape(this.name, this.color, this.x, this.y);
  }

  display(): string {
    return `Shape: ${this.name}, Color: ${this.color}, Position: (${this.x}, ${this.y})`;
  }
}

// Clase más compleja con propiedades anidadas
class DocumentPrototype implements Prototype<DocumentPrototype> {
  public title: string;
  public content: string;
  public metadata: { author: string; createdAt: string };

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.metadata = { author, createdAt: new Date().toISOString() };
  }

  // Clon profundo
  clone(): DocumentPrototype {
    const cloned = new DocumentPrototype(this.title, this.content, this.metadata.author);
    cloned.metadata.createdAt = this.metadata.createdAt;
    return cloned;
  }

  display(): string {
    return `Document: "${this.title}"\nContent: ${this.content}\nAuthor: ${this.metadata.author}`;
  }
}

// Ejemplo de uso
console.log("=== PROTOTYPE PATTERN ===\n");

console.log("Cloning shapes:");
const originalShape = new Shape("Circle", "Red", 10, 20);
console.log("Original:", originalShape.display());

const clonedShape = originalShape.clone();
clonedShape.x = 50;
clonedShape.color = "Blue";
console.log("Cloned:", clonedShape.display());
console.log("Original remains unchanged:", originalShape.display());

console.log("\n\nCloning documents:");
const originalDoc = new DocumentPrototype(
  "Report",
  "This is a quarterly report",
  "John Doe"
);
console.log("Original Document:\n", originalDoc.display());

const clonedDoc = originalDoc.clone();
clonedDoc.title = "Report - Copy";
clonedDoc.content = "Modified content";
console.log("\nCloned Document:\n", clonedDoc.display());
console.log("\nOriginal Document (still unchanged):\n", originalDoc.display());

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevos prototipos se añaden instanciando objetos sin
//     modificar código existente. El cliente clona sin conocer la clase concreta.
//   - L (Liskov Substitution): Los clones son instancias equivalentes del mismo
//     tipo y pueden sustituir al original sin afectar el comportamiento.
//   - D (Dependency Inversion): El cliente trabaja contra la interfaz genérica
//     Prototype<T>, no contra las clases Shape o Document directamente.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - S (Single Responsibility): La clase agrega la responsabilidad de clonarse
//     a sí misma, además de su responsabilidad principal de negocio.
//   - D (Dependency Inversion): Para clonar, el cliente aún debe invocar el método
//     sobre la instancia concreta inicial, atando la creación al tipo concreto.
//   - I (Interface Segregation): Si la interfaz Prototype crece con metadatos
//     adicionales (ej. deepClone vs shallowClone), las clases son forzadas a
//     implementar variantes que pueden no necesitar.

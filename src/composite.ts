/**
 * PATRÓN COMPOSITE
 * 
 * Explicación:
 * El Composite te permite componer objetos en estructuras de árbol para
 * representar jerarquías parte-todo. Permite que los clientes traten objetos
 * individuales y composiciones de objetos de manera uniforme.
 * 
 * Caso de uso: Sistemas de archivos, menús anidados, estructura de empresas
 *             con departamentos, árboles de componentes UI
 */

// Interfaz común para componentes simples y compuestos
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
  display(indent?: string): void;
}

// Componente hoja: Archivo
class TextFile implements FileSystemComponent {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  display(indent: string = ""): void {
    console.log(`${indent}📄 ${this.name} (${this.size} KB)`);
  }
}

// Componente compuesto: Directorio
class Directory implements FileSystemComponent {
  private name: string;
  private components: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  add(component: FileSystemComponent): void {
    this.components.push(component);
  }

  remove(component: FileSystemComponent): void {
    this.components = this.components.filter((c) => c !== component);
  }

  getSize(): number {
    return this.components.reduce((total, component) => total + component.getSize(), 0);
  }

  display(indent: string = ""): void {
    console.log(`${indent}📁 ${this.name}/ (${this.getSize()} KB)`);
    this.components.forEach((component) => {
      component.display(indent + "  ");
    });
  }
}

// Ejemplo de uso
console.log("=== COMPOSITE PATTERN ===\n");

// Crear estructura de archivos
const root = new Directory("root");
const documents = new Directory("Documents");
const photos = new Directory("Photos");

root.add(documents);
root.add(photos);

documents.add(new TextFile("resume.pdf", 150));
documents.add(new TextFile("cover-letter.docx", 50));

const vacation = new Directory("Vacation");
vacation.add(new TextFile("beach.jpg", 2500));
vacation.add(new TextFile("mountain.jpg", 3000));

photos.add(vacation);
photos.add(new TextFile("profile.jpg", 800));

console.log("File System Structure:");
root.display();

console.log(`\nTotal size of root: ${root.getSize()} KB`);
console.log(`Total size of Documents: ${documents.getSize()} KB`);
console.log(`Total size of Photos: ${photos.getSize()} KB`);
// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - O (Open/Closed): Nuevos tipos de componentes (ej. SymbolicLink) se agregan
//     implementando la interfaz sin modificar Directory ni el cliente.
//   - L (Liskov Substitution): File y Directory son intercambiables como
//     FileSystemComponent; el cliente los trata uniformemente.
//   - D (Dependency Inversion): El cliente depende de FileSystemComponent
//     (interfaz), no de File ni Directory directamente.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): Si se agregan métodos add()/remove() a la
//     interfaz FileSystemComponent, File se ve forzado a implementar operaciones
//     de composición que no tiene sentido para una hoja.
//   - S (Single Responsibility): La interfaz mezcla responsabilidades de nodo
//     hoja (getSize, getName) con las de nodo compuesto (add/remove).

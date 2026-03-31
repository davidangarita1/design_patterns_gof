/**
 * PATRÓN ITERATOR
 * 
 * Explicación:
 * El Iterator proporciona una forma de acceder secuencialmente a los elementos
 * de una colección sin exponer su representación subyacente.
 * 
 * Caso de uso: Recorrer colecciones, traversal de árboles, API de iteradores,
 *             navegación en estructuras de datos
 */

// Interfaz para iterador personalizada (evita conflicto con Iterator<T> nativa)
interface IIterator<T> {
  hasNext(): boolean;
  next(): T;
}

// Interfaz para colecciones iterable
interface IIterable<T> {
  createIterator(): IIterator<T>;
}

// Implementación de IIterator concreto
class BookIterator implements IIterator<string> {
  private index: number = 0;

  constructor(private books: string[]) {}

  hasNext(): boolean {
    return this.index < this.books.length;
  }

  next(): string {
    if (this.hasNext()) {
      return this.books[this.index++];
    }
    throw new Error("No more elements");
  }
}

// Implementación de Iterable concreto
class BookCollection implements IIterable<string> {
  private books: string[] = [];

  addBook(book: string): void {
    this.books.push(book);
  }

  removeBook(book: string): void {
    this.books = this.books.filter((b) => b !== book);
  }

  createIterator(): IIterator<string> {
    return new BookIterator(this.books);
  }

  getBooks(): string[] {
    return [...this.books];
  }
}

// Iterador inverso
class ReverseBookIterator implements IIterator<string> {
  private index: number;

  constructor(private books: string[]) {
    this.index = books.length - 1;
  }

  hasNext(): boolean {
    return this.index >= 0;
  }

  next(): string {
    if (this.hasNext()) {
      return this.books[this.index--];
    }
    throw new Error("No more elements");
  }
}

// Colección con iterador inverso
class AdvancedBookCollection implements IIterable<string> {
  private books: string[] = [];

  addBook(book: string): void {
    this.books.push(book);
  }

  createIterator(): IIterator<string> {
    return new BookIterator(this.books);
  }

  createReverseIterator(): IIterator<string> {
    return new ReverseBookIterator(this.books);
  }

  getBooks(): string[] {
    return [...this.books];
  }
}

// Ejemplo de uso
console.log("=== ITERATOR PATTERN ===\n");

const bookCollection = new BookCollection();
bookCollection.addBook("The Pragmatic Programmer");
bookCollection.addBook("Clean Code");
bookCollection.addBook("Design Patterns");
bookCollection.addBook("Refactoring");

console.log("--- Forward Iteration ---");
let iterator = bookCollection.createIterator();
while (iterator.hasNext()) {
  console.log(`📚 ${iterator.next()}`);
}

console.log("\n--- Using Advanced Collection with Reverse Iterator ---");
const advancedCollection = new AdvancedBookCollection();
advancedCollection.addBook("1984");
advancedCollection.addBook("To Kill a Mockingbird");
advancedCollection.addBook("The Great Gatsby");
advancedCollection.addBook("Moby Dick");

console.log("Books in forward order:");
let iter = advancedCollection.createIterator();
while (iter.hasNext()) {
  console.log(`→ ${iter.next()}`);
}

console.log("\nBooks in reverse order:");
const reverseIter = advancedCollection.createReverseIterator();
while (reverseIter.hasNext()) {
  console.log(`← ${reverseIter.next()}`);
}

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - S (Single Responsibility): La lógica de iteración está en BookIterator,
//     completamente separada de BookCollection que solo gestiona los datos.
//   - O (Open/Closed): Nuevos iteradores (ReverseBookIterator, FilterIterator)
//     se agregan sin modificar las colecciones existentes.
//   - L (Liskov Substitution): BookIterator y ReverseBookIterator son
//     intercambiables al implementar la misma interfaz Iterator<T>.
//   - D (Dependency Inversion): El cliente depende de la interfaz Iterator<T>,
//     no de BookIterator ni ReverseBookIterator directamente.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - I (Interface Segregation): La interfaz Iterator<T> incluye tanto hasNext()
//     como next(). Para iteradores de solo lectura o infinitos, algunos métodos
//     pueden no tener un significado natural (ej. hasNext() en un stream infinito).
//   - L (Liskov Substitution): Iterator.next() lanza un error si no hay siguiente
//     elemento; clientes que no llamen a hasNext() primero tendrán comportamiento
//     inesperado, rompiendo el contrato de forma implícita.

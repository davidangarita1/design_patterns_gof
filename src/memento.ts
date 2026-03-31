/**
 * PATRÓN MEMENTO
 * 
 * Explicación:
 * El Memento captura y externaliza el estado interno de un objeto sin violar
 * la encapsulación, permitiendo restaurar el objeto a un estado anterior.
 * 
 * Caso de uso: Deshacer/Rehacer, guardar puntos de control en juegos,
 *             snapshots de transacciones, historial de cambios
 */

// Originador: El objeto cuyo estado queremos guardar
class Document {
  private content: string;

  constructor(content: string = "") {
    this.content = content;
  }

  write(text: string): void {
    this.content += text;
    console.log(`Written: "${text}"`);
    console.log(`Current content: "${this.content}"`);
  }

  getContent(): string {
    return this.content;
  }

  // Crear un memento
  createMemento(): DocumentMemento {
    console.log("Creating memento with state:", this.content);
    return new DocumentMemento(this.content);
  }

  // Restaurar desde memento
  restoreFromMemento(memento: DocumentMemento): void {
    this.content = memento.getContent();
    console.log("Restored from memento. Content:", this.content);
  }
}

// Memento: Almacena el estado del Originador
class DocumentMemento {
  private content: string;
  private timestamp: Date;

  constructor(content: string) {
    this.content = content;
    this.timestamp = new Date();
  }

  getContent(): string {
    return this.content;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  getInfo(): string {
    return `Content: "${this.content}" | Saved at: ${this.timestamp.toLocaleTimeString()}`;
  }
}

// Cuidador: Gestiona los mementos
class DocumentHistory {
  private mementos: DocumentMemento[] = [];
  private currentIndex: number = -1;

  saveSnapshot(memento: DocumentMemento): void {
    // Remove redo history if user makes a new change
    this.mementos = this.mementos.slice(0, this.currentIndex + 1);
    this.mementos.push(memento);
    this.currentIndex++;
    console.log(`Snapshot saved (#${this.currentIndex + 1})`);
  }

  undo(): DocumentMemento | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      console.log(`Undo to snapshot #${this.currentIndex + 1}`);
      return this.mementos[this.currentIndex];
    }
    console.log("Nothing to undo");
    return null;
  }

  redo(): DocumentMemento | null {
    if (this.currentIndex < this.mementos.length - 1) {
      this.currentIndex++;
      console.log(`Redo to snapshot #${this.currentIndex + 1}`);
      return this.mementos[this.currentIndex];
    }
    console.log("Nothing to redo");
    return null;
  }

  getHistory(): DocumentMemento[] {
    return this.mementos;
  }
}

// Ejemplo de uso
console.log("=== MEMENTO PATTERN ===\n");

const document = new Document();
const history = new DocumentHistory();

// Realizar cambios y guardar estado
console.log("--- Action 1 ---");
document.write("Hello");
history.saveSnapshot(document.createMemento());

console.log("\n--- Action 2 ---");
document.write(" World");
history.saveSnapshot(document.createMemento());

console.log("\n--- Action 3 ---");
document.write("!");
history.saveSnapshot(document.createMemento());

console.log("\n--- Undo ---");
let memento = history.undo();
if (memento) {
  document.restoreFromMemento(memento);
}

console.log("\n--- Undo Again ---");
memento = history.undo();
if (memento) {
  document.restoreFromMemento(memento);
}

console.log("\n--- Redo ---");
memento = history.redo();
if (memento) {
  document.restoreFromMemento(memento);
}

console.log("\n--- History Snapshots ---");
history.getHistory().forEach((m) => console.log(m.getInfo()));

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - S (Single Responsibility): Document solo gestiona su contenido; DocumentHistory
//     solo gestiona el historial de snapshots; DocumentMemento solo almacena estado.
//     Cada clase tiene una única razón de cambio.
//   - O (Open/Closed): Nuevos tipos de estado a guardar se agregan sin modificar
//     la lógica de DocumentHistory.
//   - L (Liskov Substitution): Los mementos son entidades de valor inmutables;
//     cualquier snapshot puede ser restaurado de forma uniforme.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - D (Dependency Inversion): Document crea directamente instancias de
//     DocumentMemento (clase concreta). Idealmente dependeria de una interfaz
//     Memento para mayor flexibilidad.
//   - I (Interface Segregation): El caretaker (DocumentHistory) debe conocer
//     el tipo específico de DocumentMemento para poder pasarlo a restoreFromMemento();
//     no hay una interfaz opaca que proteja la privacidad del estado.

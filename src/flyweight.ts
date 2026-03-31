/**
 * PATRÓN FLYWEIGHT
 * 
 * Explicación:
 * El Flyweight optimiza la memoria compartiendo datos comunes entre múltiples
 * objetos. Divide el estado de un objeto en estado intrínseco (compartido) y
 * estado extrínseco (único).
 * 
 * Caso de uso: Aplicaciones con muchas instancias de objetos similares (árboles
 *             en videojuegos, caracteres en editores de texto, partículas)
 */

// Estado intrínseco compartido (Flyweight)
class TreeType {
  private name: string;
  private color: string;
  private texture: string;

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
    console.log(`TreeType created: ${name}`);
  }

  display(): string {
    return `${this.name} (${this.color}, ${this.texture})`;
  }
}

// Objeto que usa Flyweight (estado intrínseco + extrínseco)
class Tree {
  private x: number;
  private y: number;
  private treeType: TreeType;

  constructor(x: number, y: number, treeType: TreeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }

  display(): string {
    return `Tree at (${this.x}, ${this.y}): ${this.treeType.display()}`;
  }
}

// Factory para gestionar Flyweights compartidos
class TreeFactory {
  private treeTypes: Map<string, TreeType> = new Map();

  getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}-${color}-${texture}`;

    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }

    return this.treeTypes.get(key)!;
  }

  getTotalTreeTypes(): number {
    return this.treeTypes.size;
  }
}

// Cliente
class Forest {
  private trees: Tree[] = [];
  private treeFactory: TreeFactory;

  constructor(treeFactory: TreeFactory) {
    this.treeFactory = treeFactory;
  }

  plantTree(x: number, y: number, name: string, color: string, texture: string): void {
    const treeType = this.treeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, treeType);
    this.trees.push(tree);
  }

  // Expone los primeros N árboles sin romper la encapsulación con casts inseguros
  getFirstTrees(count: number): Tree[] {
    return this.trees.slice(0, count);
  }

  getTotalTrees(): number {
    return this.trees.length;
  }

  displayForest(): void {
    console.log("\n=== Forest Display ===");
    this.trees.forEach((tree) => console.log(tree.display()));
    console.log(`Total unique tree types: ${this.treeFactory.getTotalTreeTypes()}`);
  }
}

// Ejemplo de uso
console.log("=== FLYWEIGHT PATTERN ===\n");

const treeFactory = new TreeFactory();
const forest = new Forest(treeFactory);

// Plantando 1000 árboles pero solo con algunos tipos únicos
console.log("Planting 1000 trees (with only a few unique types)...\n");

for (let i = 0; i < 1000; i++) {
  const treeType = i % 3 === 0 ? "Oak" : i % 3 === 1 ? "Pine" : "Birch";
  const color = i % 2 === 0 ? "Green" : "Dark Green";
  const x = Math.floor(Math.random() * 100);
  const y = Math.floor(Math.random() * 100);

  forest.plantTree(x, y, treeType, color, "Standard");
}

// Mostrar solo los primeros 10 árboles usando la API pública del Forest
console.log("\nFirst 10 trees in the forest:");
forest.getFirstTrees(10).forEach((tree) => console.log(tree.display()));

forest.displayForest();
console.log("\nMemory optimized: Many trees share the same TreeType instances");

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// ✅  PRINCIPIOS QUE USA:
//   - S (Single Responsibility): TreeType gestiona solo el estado intrínseco
//     compartido; Tree gestion el estado extrínseco (posición); TreeFactory
//     gestiona el caché. Cada clase tiene una responsabilidad clara.
//   - O (Open/Closed): Nuevos tipos de árboles se añaden sin modificar
//     la lógica de Forest ni de TreeFactory.
//
// ⚠️  PRINCIPIOS QUE VIOLA U OMITE:
//   - D (Dependency Inversion): Forest y Tree dependen directamente de TreeType
//     (clase concreta), no de una interfaz o abstracción.
//   - I (Interface Segregation): TreeType expone todo su estado como un bloque;
//     clientes que solo necesitan el color no pueden obtener solo eso.
//   - O (Open/Closed): Agregar un nuevo campo al estado intrínseco de TreeType
//     requiere modificar la firma del constructor y del método getTreeType.

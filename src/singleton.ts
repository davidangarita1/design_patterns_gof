/**
 * PATRÓN SINGLETON
 * 
 * Explicación:
 * El patrón Singleton asegura que una clase solo tenga una única instancia
 * durante toda la ejecución de la aplicación, y proporciona un punto de acceso
 * global a esa instancia.
 * 
 * Caso de uso: Base de datos, Logger, Configuración global
 */

// Implementación del Singleton
class SingletonDatabaseConnection {
  private static instance: SingletonDatabaseConnection;
  private connectionString: string;

  // Constructor privado previene instanciación directa
  private constructor() {
    this.connectionString = "Connected to DB";
    console.log("Database connection initialized (this should appear only once)");
  }

  // Método estático que retorna la única instancia
  public static getInstance(): SingletonDatabaseConnection {
    if (!SingletonDatabaseConnection.instance) {
      SingletonDatabaseConnection.instance = new SingletonDatabaseConnection();
    }
    return SingletonDatabaseConnection.instance;
  }

  public connect(): string {
    return this.connectionString;
  }
}

// Ejemplo de uso
console.log("=== SINGLETON PATTERN ===\n");

const db1 = SingletonDatabaseConnection.getInstance();
console.log("First instance connection:", db1.connect());

const db2 = SingletonDatabaseConnection.getInstance();
console.log("Second instance connection:", db2.connect());

console.log("\nAre they the same instance?", db1 === db2); // true

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [WARNING] PRINCIPIOS QUE VIOLA:
//   - S (Single Responsibility): El Singleton suele convertirse en un "God Object"
//     con múltiples responsabilidades al ser el único punto de acceso global.
//   - O (Open/Closed): El constructor privado impide la herencia normal, haciendo
//     imposible extender la clase sin modificarla.
//   - D (Dependency Inversion): Los módulos dependen directamente de la clase
//     concreta, no de abstracciones. Esto hace muy difícil el testing (mockeo).
//   - L (Liskov Substitution): No puede ser sustituido por subclases de forma
//     segura debido al constructor privado y al estado global compartido.
//
// [CHECK] PRINCIPIOS QUE RESPETA (parcialmente):
//   - S: Si se diseña con cuidado, la clase Singleton puede tener una sola
//     responsabilidad bien definida (ej. solo gestionar la conexión a BD).
//
// 💡 NOTA: En arquitecturas modernas se prefiere Inyección de Dependencias (DI)
//     como alternativa más testeable y flexible al Singleton.

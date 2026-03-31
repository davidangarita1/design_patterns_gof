/**
 * 📚 COMPLETE LIST OF 23 GoF DESIGN PATTERNS
 * 
 * Este archivo sirve como referencia rápida para todos los patrones van de diseño
 * implementados en este proyecto.
 * 
 * Para ejecutar cada patrón, usa:
 * npx ts-node src/[pattern-name].ts
 */

console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                  DESIGN PATTERNS - GANG OF FOUR (GoF)                     ║
║                      Complete Implementation in TypeScript                ║
╚════════════════════════════════════════════════════════════════════════════╝

📂 CREATIONAL PATTERNS (5) - Patrones de Creación
   Enfocados en la creación flexible de objetos

   1.  Singleton              → npx ts-node src/singleton.ts
       Asegura una única instancia de una clase

   2.  Factory Method         → npx ts-node src/factory-method.ts
       Delega creación de objetos a subclases

   3.  Abstract Factory       → npx ts-node src/abstract-factory.ts
       Crea familias de objetos relacionados

   4.  Builder                → npx ts-node src/builder.ts
       Construye objetos complejos paso a paso

   5.  Prototype              → npx ts-node src/prototype.ts
       Crea objetos clonando un prototipo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️  STRUCTURAL PATTERNS (7) - Patrones Estructurales
   Tratan la composición de clases y objetos

   6.  Adapter                → npx ts-node src/adapter.ts
       Convierte una interfaz a otra esperada

   7.  Bridge                 → npx ts-node src/bridge.ts
       Desacopla abstracción de implementación

   8.  Composite              → npx ts-node src/composite.ts
       Compone objetos en estructuras de árbol

   9.  Decorator              → npx ts-node src/decorator.ts
       Extiende funcionalidad dinámicamente

   10. Facade                 → npx ts-node src/facade.ts
       Simplifica interfaces complejas

   11. Flyweight              → npx ts-node src/flyweight.ts
       Optimiza memoria compartiendo datos

   12. Proxy                  → npx ts-node src/proxy.ts
       Controla acceso a otro objeto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 BEHAVIORAL PATTERNS (11) - Patrones de Comportamiento
   Centrados en comunicación entre objetos

   13. Chain of Responsibility → npx ts-node src/chain-of-responsibility.ts
       Pasa solicitudes a lo largo de una cadena

   14. Command                → npx ts-node src/command.ts
       Encapsula una solicitud como objeto

   15. Interpreter            → npx ts-node src/interpreter.ts
       Define gramática para un lenguaje

   16. Iterator               → npx ts-node src/iterator.ts
       Accede secuencialmente a elementos

   17. Mediator               → npx ts-node src/mediator.ts
       Encapsula interacciones entre objetos

   18. Memento                → npx ts-node src/memento.ts
       Captura estado para restaurarse luego

   19. Observer               → npx ts-node src/observer.ts
       Notifica a múltiples objetos de cambios

   20. State                  → npx ts-node src/state.ts
       Altera comportamiento según estado

   21. Strategy               → npx ts-node src/strategy.ts
       Define familia de algoritmos intercambiables

   22. Template Method        → npx ts-node src/template-method.ts
       Define esqueleto en clase base

   23. Visitor                → npx ts-node src/visitor.ts
       Define nuevas operaciones sin cambiar elementos

╔════════════════════════════════════════════════════════════════════════════╗
║ 🚀 QUICK START                                                             ║
╢════════════════════════════════════════════════════════════════════════════╡
║                                                                            ║
║  Instalar dependencias:                                                    ║
║  $ pnpm install                                                           ║
║                                                                            ║
║  Ejecutar un patrón:                                                       ║
║  $ npx ts-node src/singleton.ts                                           ║
║                                                                            ║
║  Ejecutar todos los patrones:                                              ║
║  $ for f in src/*.ts; do npx ts-node "$f"; done                           ║
║                                                                            ║
║  Ver documentación:                                                        ║
║  $ cat README.md                                                          ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

📊 STATISTICS:
   • Total Patrones: 23
   • Patrones Creacionales: 5
   • Patrones Estructurales: 7
   • Patrones de Comportamiento: 11
   • Líneas de código: ~3500+
   • Todos implementados en TypeScript

💡 TIPS:
   • Cada patrón tiene su propia explicación y casos de uso
   • Los ejemplos son prácticos y fáciles de entender
   • Puedes modificar los archivos para experimentar
   • Recomendado: Leer el comentario descriptivo de cada patrón

🎓 LEARNING PATH:
   1. Empieza con Creacional (Foundation)
   2. Continúa con Estructural (Building Blocks)
   3. Termina con Comportamiento (Advanced Interactions)

═══════════════════════════════════════════════════════════════════════════════
`);

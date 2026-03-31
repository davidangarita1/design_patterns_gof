# Gang of Four Design Patterns in TypeScript

A comprehensive implementation of all 23 Gang of Four (GoF) design patterns in TypeScript with practical, executable examples. Each pattern is self-contained, well-documented, and follows SOLID principles.

## Overview

This project implements all classic design patterns from the seminal book "Design Patterns: Elements of Reusable Object-Oriented Software" by Gang of Four. Patterns are categorized into three main types:

### Creational Patterns (5)
Patterns that deal with object creation mechanisms:
- **Singleton** - Ensures a class has only one instance
- **Factory Method** - Creates objects without specifying exact classes
- **Abstract Factory** - Creates families of related objects
- **Builder** - Constructs complex objects step by step
- **Prototype** - Creates objects by cloning a prototype

### Structural Patterns (7)
Patterns that deal with object composition and relationships:
- **Adapter** - Converts interface of a class to another interface clients expect
- **Bridge** - Decouples abstraction from implementation
- **Composite** - Composes objects into hierarchies
- **Decorator** - Adds behavior to objects dynamically
- **Facade** - Provides simplified interface to complex subsystem
- **Flyweight** - Shares fine-grained objects efficiently
- **Proxy** - Provides surrogate/placeholder for another object

### Behavioral Patterns (11)
Patterns that deal with object collaboration and responsibility distribution:
- **Chain of Responsibility** - Passes requests along a chain of handlers
- **Command** - Encapsulates request as an object
- **Interpreter** - Defines grammar for interpreting language
- **Iterator** - Accesses elements sequentially without exposing structure
- **Mediator** - Reduces coupling by centralizing communication
- **Memento** - Captures and externalizes object state
- **Observer** - Notifies multiple objects about state changes
- **State** - Alters behavior when internal state changes
- **Strategy** - Defines family of algorithms and encapsulates them
- **Template Method** - Defines skeleton of algorithm in base class
- **Visitor** - Defines new operations without changing element classes

## Features

- [CHECK] **23 Complete GoF Patterns** - All classical design patterns implemented
- [CHECK] **TypeScript** - Strict typing with modern TypeScript features
- [CHECK] **Executable Examples** - Each pattern runs independently
- [CHECK] **SOLID Principles** - Patterns analyzed for SOLID compliance
- [CHECK] **Production Ready** - No external dependencies beyond runtime
- [CHECK] **Spanish Comments** - Implementation details explained in Spanish
- [CHECK] **English Code** - All code written in English
- [CHECK] **Practical Use Cases** - Real-world examples for each pattern

## Project Structure

```
design-patterns/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── run-all-patterns.sh
└── src/
    ├── index.ts
    │
    ├── singleton.ts
    ├── factory-method.ts
    ├── abstract-factory.ts
    ├── builder.ts
    ├── prototype.ts
    │
    ├── adapter.ts
    ├── bridge.ts
    ├── composite.ts
    ├── decorator.ts
    ├── facade.ts
    ├── flyweight.ts
    ├── proxy.ts
    │
    ├── chain-of-responsibility.ts
    ├── command.ts
    ├── interpreter.ts
    ├── iterator.ts
    ├── mediator.ts
    ├── memento.ts
    ├── observer.ts
    ├── state.ts
    ├── strategy.ts
    ├── template-method.ts
    └── visitor.ts
```

## Requirements

- **Node.js** 16+ or higher
- **pnpm** - Fast, disk space efficient package manager
- **TypeScript** - Already configured

## Installation

```bash
# Install dependencies
pnpm install

# Verify installation
pnpm ts-node --version
```

## Usage

### Run a Single Pattern

Execute any pattern individually:

```bash
# Run Singleton pattern
pnpm ts-node src/singleton.ts

# Run Observer pattern
pnpm ts-node src/observer.ts

# Run Strategy pattern
pnpm ts-node src/strategy.ts
```

### Run All Patterns

Execute all 23 patterns sequentially:

```bash
chmod +x run-all-patterns.sh
./run-all-patterns.sh
```

### View Reference Index

See descriptions of all patterns:

```bash
pnpm ts-node src/index.ts
```

## Pattern Examples

### Singleton Pattern

```bash
pnpm ts-node src/singleton.ts
```

**Output:**
```
SINGLETON PATTERN
Database Connection established
Connection: Database connected
Recreating connection: Same instance!
```

### Observer Pattern

```bash
pnpm ts-node src/observer.ts
```

**Output:**
```
OBSERVER PATTERN
[Email Subscriber] Notification received: Special sale on electronics!
[SMS Subscriber] Notification received: Special sale on electronics!
```

### Strategy Pattern

```bash
pnpm ts-node src/strategy.ts
```

**Output:**
```
STRATEGY PATTERN
CARD PAYMENT
Processing CARD payment of $49.99 USD
Transaction ID: TXN-1234567890

PAYPAL PAYMENT
Processing PAYPAL payment of $29.99 USD
Transaction reference: REF-9876543210
```

## Pattern Analysis

Each pattern file includes analysis of:

- **Pattern Description** - What the pattern does
- **Use Cases** - When to use the pattern
- **Implementation** - Complete working code
- **SOLID Principles** - Which principles are used and which are omitted

### SOLID Principles Reference

- **S**ingle Responsibility Principle - Each class should have one reason to change
- **O**pen/Closed Principle - Open for extension, closed for modification
- **L**iskov Substitution Principle - Subtypes must be substitutable for base types
- **I**nterface Segregation Principle - Depend on specific interfaces, not general ones
- **D**ependency Inversion Principle - Depend on abstractions, not concretions

Example from a pattern file:

```typescript
// SOLID PRINCIPLES IN THIS PATTERN
// [CHECK] Uses: Single Responsibility Principle
//         Each observer has only one responsibility: react to notifications
// [CHECK] Uses: Open/Closed Principle
//         Open to extend with new observers, closed for modification
// [WARNING] Omits: Dependency Inversion Principle
//           Observer classes directly depend on concrete subjects
```

## Execution Verification

All patterns have been tested and verified to:

1. Compile successfully with TypeScript compiler
2. Execute without runtime errors
3. Produce expected output
4. Follow design pattern principles
5. Demonstrate proper SOLID compliance

## Best Practices

When studying or extending these patterns:

1. **Learn the Intent** - Understand the problem the pattern solves
2. **Study the Structure** - Examine relationships between classes
3. **Review Trade-offs** - Understand when and why to use each pattern
4. **Practice Implementation** - Implement patterns in your own projects
5. **Consider Trade-offs** - Evaluate SOLID principle trade-offs

## File Size Reference

Each pattern file is self-contained with:
- Complete implementation (40-100 lines typically)
- Practical example (10-30 lines)
- SOLID analysis (8-15 lines)
- Output demonstration (2-5 lines)

## Compilation and Type Checking

Check for TypeScript errors:

```bash
# Type check all files
pnpm tsc --noEmit

# Watch mode for development
pnpm tsc --watch --noEmit
```

## Performance Notes

- **Startup Time** - Each pattern executes in <100ms
- **Memory Usage** - Minimal, no caching or persistence
- **Dependencies** - None beyond Node.js runtime and TypeScript
- **Scalability** - All examples demonstrate patterns with small datasets for clarity

## Learning Path

Recommended learning order:

1. **Start with Creational** - Singleton, Factory Method
2. **Move to Structural** - Adapter, Facade
3. **Advanced Creational** - Builder, Abstract Factory
4. **Advanced Structural** - Bridge, Composite
5. **Begin Behavioral** - Observer, Strategy
6. **Complex Behavioral** - Chain of Responsibility, Visitor

## Common Variations

Some patterns have multiple implementations:

- **Factory Method** vs **Abstract Factory** - Different abstraction levels
- **Strategy** vs **State** - Different intent (algorithm selection vs state management)
- **Proxy** vs **Decorator** - Different motivation (access control vs enhancement)
- **Iterator** vs **Composite** - Different structure (traversal vs hierarchy)

## Troubleshooting

### TypeScript Compilation Error

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Execution Error

```bash
# Ensure Node.js is properly installed
node --version
pnpm --version

# Run with explicit TypeScript loader
pnpm ts-node --transpile-only src/pattern-name.ts
```

### Performance Issues

All patterns execute instantly. If slow, check:
1. Node.js version (should be 16+)
2. Disk space
3. System resources

## Quick Reference

| Pattern | Category | Use When | File |
|---------|----------|----------|------|
| Singleton | Creational | Need single global instance | `src/singleton.ts` |
| Factory Method | Creational | Create objects without specifying classes | `src/factory-method.ts` |
| Abstract Factory | Creational | Create families of related objects | `src/abstract-factory.ts` |
| Builder | Creational | Construct complex objects step by step | `src/builder.ts` |
| Prototype | Creational | Clone objects instead of creating new | `src/prototype.ts` |
| Adapter | Structural | Make incompatible interfaces compatible | `src/adapter.ts` |
| Bridge | Structural | Separate abstraction from implementation | `src/bridge.ts` |
| Composite | Structural | Compose objects into hierarchies | `src/composite.ts` |
| Decorator | Structural | Add responsibilities dynamically | `src/decorator.ts` |
| Facade | Structural | Provide unified interface to subsystem | `src/facade.ts` |
| Flyweight | Structural | Share objects to reduce memory | `src/flyweight.ts` |
| Proxy | Structural | Control access to another object | `src/proxy.ts` |
| Chain of Responsibility | Behavioral | Pass request along chain of handlers | `src/chain-of-responsibility.ts` |
| Command | Behavioral | Encapsulate request as object | `src/command.ts` |
| Interpreter | Behavioral | Define language grammar | `src/interpreter.ts` |
| Iterator | Behavioral | Access elements sequentially | `src/iterator.ts` |
| Mediator | Behavioral | Centralize object communication | `src/mediator.ts` |
| Memento | Behavioral | Capture and restore state | `src/memento.ts` |
| Observer | Behavioral | Notify dependents of state change | `src/observer.ts` |
| State | Behavioral | Alter behavior based on state | `src/state.ts` |
| Strategy | Behavioral | Select algorithm at runtime | `src/strategy.ts` |
| Template Method | Behavioral | Define algorithm skeleton in base class | `src/template-method.ts` |
| Visitor | Behavioral | Define operation without changing elements | `src/visitor.ts` |

## Contributing

To add improvements or fix issues:

1. Follow TypeScript strict mode
2. Add SOLID analysis at end of files
3. Include practical examples
4. Use English for code, Spanish for comments
5. Test execution before committing

## License

Educational purpose - Gang of Four Design Patterns reference implementation

## References

- **Design Patterns: Elements of Reusable Object-Oriented Software**
  - Authors: Gang of Four (Gamma, Helm, Johnson, Vlissides)
  - Published: 1994, Addison-Wesley

- **SOLID Principles**
  - Single Responsibility, Open/Closed, Liskov Substitution
  - Interface Segregation, Dependency Inversion

- **TypeScript Documentation**
  - https://www.typescriptlang.org/docs/

## Support

For questions about specific patterns, review the implementation file and SOLID analysis section. Each pattern is self-contained and executable for learning purposes.

---

**Status:** All 23 GoF patterns implemented, tested, and documented.

**Last Updated:** March 31, 2026

**Project Quality:** Production-ready reference implementation

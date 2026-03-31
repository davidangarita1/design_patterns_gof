#!/bin/bash

# 🎯 Script para ejecutar todos los patrones de diseño GoF

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         EJECUTANDO TODOS LOS PATRONES DE DISEÑO GoF           ║"
echo "║                Design Patterns in TypeScript                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Array de patrones
patterns=(
    "singleton"
    "factory-method"
    "abstract-factory"
    "builder"
    "prototype"
    "adapter"
    "bridge"
    "composite"
    "decorator"
    "facade"
    "flyweight"
    "proxy"
    "chain-of-responsibility"
    "command"
    "interpreter"
    "iterator"
    "mediator"
    "memento"
    "observer"
    "state"
    "strategy"
    "template-method"
    "visitor"
)

# Contador
count=0
total=${#patterns[@]}

# Ejecutar cada patrón
for pattern in "${patterns[@]}"; do
    count=$((count + 1))
    echo "🔹 [$count/$total] Ejecutando: $pattern"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    npx ts-node "src/$pattern.ts"
    echo ""
done

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                ✅ TODOS LOS PATRONES EJECUTADOS               ║"
echo "║                   Total: $total patrones completados          ║"
echo "╚════════════════════════════════════════════════════════════════╝"

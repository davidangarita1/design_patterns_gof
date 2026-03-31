/**
 * PATRÓN FACADE
 * 
 * Explicación:
 * El Facade proporciona una interfaz unificada y simplificada para un conjunto
 * de interfaces más complejas de un subsistema. Oculta la complejidad subyacente.
 * 
 * Caso de uso: Simplificar bibliotecas complejas, ordenar películas en cines,
 *             procesar pedidos en tiendas en línea, inicialización de Software
 */

// Subsistema 1: Amplificador de audio
class AudioAmplifier {
  turnOn(): void {
    console.log("Amplifier is on");
  }

  turnOff(): void {
    console.log("Amplifier is off");
  }

  setVolume(level: number): void {
    console.log(`Setting volume to ${level}`);
  }
}

// Subsistema 2: Reproductor de DVD
class DVDPlayer {
  turnOn(): void {
    console.log("DVD player is on");
  }

  turnOff(): void {
    console.log("DVD player is off");
  }

  play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }

  stop(): void {
    console.log("DVD player stopped");
  }
}

// Subsistema 3: Proyector
class Projector {
  turnOn(): void {
    console.log("Projector is on");
  }

  turnOff(): void {
    console.log("Projector is off");
  }

  setInput(input: string): void {
    console.log(`Projector input set to ${input}`);
  }

  setScreenSize(size: string): void {
    console.log(`Screen size set to ${size}`);
  }
}

// Subsistema 4: Luces
class Lights {
  dim(level: number): void {
    console.log(`Lights dimmed to ${level}%`);
  }

  turnOff(): void {
    console.log("Lights are off");
  }
}

// Subsistema 5: Control de temperatura
class TemperatureControl {
  setTemperature(celsius: number): void {
    console.log(`Temperature set to ${celsius}°C`);
  }
}

// FACADE: Simplifica el uso de todos los subsistemas
class HomeTheaterFacade {
  private amplifier: AudioAmplifier;
  private dvdPlayer: DVDPlayer;
  private projector: Projector;
  private lights: Lights;
  private temperatureControl: TemperatureControl;

  constructor(
    amplifier: AudioAmplifier,
    dvdPlayer: DVDPlayer,
    projector: Projector,
    lights: Lights,
    temperatureControl: TemperatureControl
  ) {
    this.amplifier = amplifier;
    this.dvdPlayer = dvdPlayer;
    this.projector = projector;
    this.lights = lights;
    this.temperatureControl = temperatureControl;
  }

  // Operación simplificada
  watchMovie(movie: string): void {
    console.log("--- Starting Home Theater ---\n");
    this.lights.dim(10);
    this.temperatureControl.setTemperature(22);
    this.projector.turnOn();
    this.projector.setInput("DVD");
    this.projector.setScreenSize("Large");
    this.amplifier.turnOn();
    this.amplifier.setVolume(5);
    this.dvdPlayer.turnOn();
    this.dvdPlayer.play(movie);
    console.log("--- Home Theater is ready! ---\n");
  }

  endMovie(): void {
    console.log("--- Ending Home Theater ---\n");
    this.dvdPlayer.stop();
    this.dvdPlayer.turnOff();
    this.amplifier.turnOff();
    this.projector.turnOff();
    this.lights.turnOff();
    console.log("--- Home Theater is off ---\n");
  }
}

// Ejemplo de uso
console.log("=== FACADE PATTERN ===\n");

const homeTheater = new HomeTheaterFacade(
  new AudioAmplifier(),
  new DVDPlayer(),
  new Projector(),
  new Lights(),
  new TemperatureControl()
);

homeTheater.watchMovie("Inception");
homeTheater.endMovie();

// =============================================================================
// PRINCIPIOS SOLID EN ESTE PATRÓN
// =============================================================================
//
// [CHECK] PRINCIPIOS QUE USA:
//   - S (Single Responsibility): La fachada centraliza y simplifica el acceso
//     al subsistema, su única responsabilidad es exponer operaciones de alto nivel.
//   - D (Dependency Inversion): El cliente depende de HomeTheaterFacade, no
//     directamente de AudioAmplifier, DVDPlayer, etc.
//   - O (Open/Closed): Se pueden agregar nuevos métodos de alto nivel a la
//     fachada (ej. streamMovie) sin cambiar los subsistemas.
//
// [WARNING] PRINCIPIOS QUE VIOLA U OMITE:
//   - D (Dependency Inversion): La fachada depende de clases concretas de
//     subsistema, no de interfaces. Si se cambia DVDPlayer, hay que modificar
//     la fachada. Lo ideal sería inyectar interfaces abstractas.
//   - O (Open/Closed): Agregar un nuevo subsistema (ej. SmartTV) requiere
//     modificar la fachada internamente.
//   - I (Interface Segregation): Un cliente que solo necesita encender el
//     proyector se ve forzado a usar la fachada completa o los subsistemas.

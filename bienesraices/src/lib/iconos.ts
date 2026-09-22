import {
  Anchor,
  ArrowLeftRight,
  BadgeCheck,
  Calculator,
  Compass,
  Dumbbell,
  Eye,
  FileText,
  Gem,
  Grape,
  Handshake,
  KeyRound,
  Languages,
  ListChecks,
  Map,
  MapPin,
  MessageSquare,
  Ruler,
  ShieldCheck,
  Ship,
  Sun,
  Trees,
  UtensilsCrossed,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Las claves las escribe el contenido (`icono: "vista"`), no el componente.
 * Si una clave no existe aquí, el componente pinta la marca genérica en vez
 * de romper el build.
 */
const ICONOS = {
  // Amenidades de desarrollo
  seguridad: ShieldCheck,
  vista: Eye,
  parque: Trees,
  servicios: Zap,
  deporte: Dumbbell,
  planeacion: Map,
  posventa: Handshake,
  superficie: Ruler,
  // Argumento de plaza
  frontera: ArrowLeftRight,
  puerto: Ship,
  llave: KeyRound,
  // Estilo de vida
  vino: Grape,
  ola: Waves,
  mesa: UtensilsCrossed,
  clima: Sun,
  mar: Anchor,
  // Proceso de compra
  conversacion: MessageSquare,
  seleccion: ListChecks,
  visita: MapPin,
  apartado: FileText,
  escritura: KeyRound,
  // Principios
  exclusividad: Gem,
  numeros: Calculator,
  bilingue: Languages,
  orientacion: Compass,
  verificado: BadgeCheck,
} satisfies Record<string, LucideIcon>;

export type ClaveIcono = keyof typeof ICONOS;

export function icono(clave: string): LucideIcon {
  return ICONOS[clave as ClaveIcono] ?? Gem;
}

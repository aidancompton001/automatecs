import type { Option } from "@/types";
import optionsData from "@/data/options.json";

const optionsMap = new Map<string, Option>(
  (optionsData as Option[]).map((o) => [o.id, o])
);

/**
 * Calculate total price: base + selected options.
 *
 * ЖЕЛЕЗНОЕ ПРАВИЛО: all values in cents (integer). No floats.
 *
 * @param basePriceCents - Base machine price in cents (e.g. 829000)
 * @param selectedOptionIds - Array of option IDs to add
 * @returns Total price in cents
 * @throws Error if any optionId is invalid (Landa L3)
 */
export function calculateTotal(
  basePriceCents: number,
  selectedOptionIds: string[]
): number {
  let total = basePriceCents;

  for (const id of selectedOptionIds) {
    const option = optionsMap.get(id);
    if (!option) {
      throw new Error(`Invalid option ID: "${id}". Available: ${[...optionsMap.keys()].join(", ")}`);
    }
    total += option.priceCents;
  }

  return total;
}

/**
 * Get all available options.
 */
export function getAllOptions(): Option[] {
  return optionsData as Option[];
}

/**
 * Get option by ID.
 */
export function getOptionById(id: string): Option | undefined {
  return optionsMap.get(id);
}

/**
 * Get all valid option IDs.
 */
export function getAllOptionIds(): string[] {
  return [...optionsMap.keys()];
}

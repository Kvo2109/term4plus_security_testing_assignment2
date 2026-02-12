import { HoldingAsset } from "../portfolio/portfolioLargestAsset";

interface AllocatedAsset {
  allocatedItem: HoldingAsset;
  totalHoldingPercentage: string;
}

/**
 * Return an appropriate corresponded API or error string based on the inputs.
 *
 * @param {HoldingAsset[]} arrayOfAssets - An array contains all objective elements based on the HoldingAsset interface
 * @returns {AllocatedAsset[]} When objects are spotted in the array, the returned API will be an array including those objects with allocated percentage based on total value.
 * @returns {string} When there is an empty array with no object found, the return will be an error message.
 *
 * @example
 * Here's an example for array with several valid objects:
 * const holdingAssets: HoldingAsset[] = [
 *  { name: "house", value: 20000 },
 *  { name: "laptop", value: 100 },
 * ];
 * // Prints "[
 * {allocatedItem: { name: "house", value: 20000 }, totalHoldingPercentage: 99.50%},
 * {allocatedItem: { name: "laptop", value: 100 }, totalHoldingPercentage: 0.50%},
 * ]"
 * console.log(allocateAssetPercentage(holdingAssets));
 *
 * @example
 * Here's an example for an empty array:
 * const holdingAssets: HoldingAsset[] = [];
 * // Prints "Sorry, but you have no asset to evaluate!"
 * console.log(allocateAssetPercentage(holdingAssets));
 */
export function allocateAssetPercentage(
  arrayOfAssets: HoldingAsset[]
): AllocatedAsset[] | string {
  // Empty array handler
  if (arrayOfAssets.length === 0) {
    return `Sorry, but you have no asset to allocate!`;
  }

  // Logic handler for sum up the value
  let totalHoldingValue: number = 0;
  for (let i: number = 0; i < arrayOfAssets.length; i++) {
    totalHoldingValue += arrayOfAssets[i].value;
  }

  // Logic handler for allocating percentage
  const allocatedAsset: AllocatedAsset[] = arrayOfAssets.map((obj) => {
    const allocatedValue = (obj.value / totalHoldingValue) * 100;
    return {
      allocatedItem: obj,
      totalHoldingPercentage: `${allocatedValue.toFixed(2)}%`,
    };
  });

  // Return API
  return allocatedAsset;
}

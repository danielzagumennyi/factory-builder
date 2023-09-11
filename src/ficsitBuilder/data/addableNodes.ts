import data from "./parsedData.json";

const originalDocs = Object.values(data.meta.originalDocs).reduce(
  (acc, val) => {
    acc[val.NativeClass] = val.Classes;
    return acc;
  },
  {}
);

console.log("data:", originalDocs);

export type Recipe = {
  id: string;
  name: string;
  image: string;
  input: Input[];
  output: Output[];
  productionNodes: string[];
};

export type Input = {
  id: string;
  count: string;
};

export type Output = {
  id: string;
  count: string;
};

export type ProductionNodeType = {
  id: string;
  name: string;
  desc: string;
  image: string;
  recipes: Recipe[];
};

export type Category = {
  name: string;
  nodes: ProductionNodeType[];
};

export const addableNodes: Category[] = [];

interface IFGRecipe {
  ClassName: string;
  FullName: string;
  mDisplayName: string;
  mIngredients: string;
  mProduct: string;
  mManufacturingMenuPriority: string;
  mManufactoringDuration: string;
  mManualManufacturingMultiplier: string;
  mProducedIn: string;
  mRelevantEvents: string;
  mVariablePowerConsumptionConstant: string;
  mVariablePowerConsumptionFactor: string;
}

const recipes = (
  originalDocs["Class'/Script/FactoryGame.FGRecipe'"] as IFGRecipe[]
).map<Recipe>((el) => {
  const id = el.ClassName.replace("Recipe_", "");

  const descriptor = [
    ...originalDocs["Class'/Script/FactoryGame.FGItemDescriptor'"],
    ...originalDocs["Class'/Script/FactoryGame.FGItemDescriptorBiomass'"],
    ...originalDocs["Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'"],
    ...originalDocs["Class'/Script/FactoryGame.FGPoleDescriptor'"],
    ...originalDocs["Class'/Script/FactoryGame.FGResourceDescriptor'"],
  ].find((el) => el.ClassName.includes(id));

  const image =
    descriptor?.mSmallIcon
      .replace(
        "Texture2D ",
        "http://localhost:5173/src/ficsitBuilder/resourses/images/"
      )
      .split(".")[0] + ".png";

  return {
    id,
    image,
    name: el.mDisplayName,
    productionNodes: el.mProducedIn.split(",").map((el) => el.split(".")[1]),
    input: el.mIngredients.split(/\),/g).map((el) => ({
      id: el.split(",")[0].split("_")[2],
      count: parseInt(el.split(",")[1].replace(/\D/g, "")),
    })),
    output: el.mProduct.split(/\),/g).map((el) => ({
      id: el.split(",")[0].split("_")[2],
      count: parseInt(el.split(",")[1].replace(/\D/g, "")),
    })),
  };
});

console.log("🚀 ~ file: addableNodes.ts:76 ~ recipes:", recipes);

// parseInt("((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/IronIngot/Desc_IronIngot.Desc_IronIngot_C\"',Amount=1))".split(",")[1].replace(/\D/g, ""))
// "((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/IronIngot/Desc_IronIngot.Desc_IronIngot_C\"',Amount=1))".split(",")[0].split("_")[2]

interface IFGBuildableManufacturer {
  ClassName: string;
  IsPowered: string;
  mCurrentRecipeCheck: string;
  mPreviousRecipeCheck: string;
  CurrentPotentialConvert: string;
  mCurrentRecipeChanged: string;
  mManufacturingSpeed: string;
  mFactoryInputConnections: string;
  mPipeInputConnections: string;
  mFactoryOutputConnections: string;
  mPipeOutputConnections: string;
  mPowerConsumption: string;
  mPowerConsumptionExponent: string;
  mDoesHaveShutdownAnimation: string;
  mOnHasPowerChanged: string;
  mOnHasProductionChanged: string;
  mOnHasStandbyChanged: string;
  mMinimumProducingTime: string;
  mMinimumStoppedTime: string;
  mCanEverMonitorProductivity: string;
  mCanChangePotential: string;
  mMinPotential: string;
  mMaxPotential: string;
  mMaxPotentialIncreasePerCrystal: string;
  mFluidStackSizeDefault: string;
  mFluidStackSizeMultiplier: string;
  OnReplicationDetailActorCreatedEvent: string;
  mEffectUpdateInterval: string;
  mDefaultProductivityMeasurementDuration: string;
  mLastProductivityMeasurementProduceDuration: string;
  mLastProductivityMeasurementDuration: string;
  mCurrentProductivityMeasurementProduceDuration: string;
  mCurrentProductivityMeasurementDuration: string;
  mProductivityMonitorEnabled: string;
  mCachedSkeletalMeshes: string;
  mAddToSignificanceManager: string;
  mSignificanceRange: string;
  mDisplayName: string;
  mDescription: string;
  MaxRenderDistance: string;
  mHighlightVector: string;
  mAlternativeMaterialRecipes: string;
  mContainsComponents: string;
  mBuildEffectSpeed: string;
  mAllowColoring: string;
  mAllowPatterning: string;
  mSkipBuildEffect: string;
  mForceNetUpdateOnRegisterPlayer: string;
  mToggleDormancyOnInteraction: string;
  mIsMultiSpawnedBuildable: string;
  mShouldShowHighlight: string;
  mShouldShowAttachmentPointVisuals: string;
  mCreateClearanceMeshRepresentation: string;
  mCanContainLightweightInstances: string;
  mAffectsOcclusion: string;
  mOcclusionShape: string;
  mScaleCustomOffset: string;
  mCustomScaleType: string;
  mOcclusionBoxInfo: string;
  mAttachmentPoints: string;
  mInteractingPlayers: string;
  mIsUseable: string;
  mHideOnBuildEffectStart: string;
  mShouldModifyWorldGrid: string;
  mBlueprintBuildEffectID: string;
}

export const productionNodes: ProductionNodeType[] = (
  originalDocs[
    "Class'/Script/FactoryGame.FGBuildableManufacturer'"
  ] as IFGBuildableManufacturer[]
).map((el) => {
  const id = el.ClassName.replace("Build_", "");

  const descriptor = originalDocs[
    "Class'/Script/FactoryGame.FGBuildingDescriptor'"
  ].find((el) => el.ClassName.includes(id));

  const image =
    descriptor.mSmallIcon
      .replace(
        "Texture2D ",
        "http://localhost:5173/src/ficsitBuilder/resourses/images/"
      )
      .split(".")[0] + ".png";

  return {
    id: id,
    desc: el.mDescription,
    name: el.mDisplayName,
    image: image,
    recipes: recipes.filter((r) =>
      r.productionNodes.some((pn) => pn?.includes(id))
    ),
  };
});

console.log(
  "🚀 ~ file: addableNodes.ts:146 ~ productionNodes:",
  productionNodes
);

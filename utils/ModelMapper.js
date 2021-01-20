import { assign } from 'lodash';

class ModelMapper {
  constructor(model, modelMap, modelPrototype) {
    this.model = model
    this.modelMap = modelMap
    this.modelPrototype = modelPrototype
  }

  mappingReducer(sourceObj, mapping, isMappingModelToApi) {
    const sourceMapIndex = isMappingModelToApi ? 0 : 1;
    const targetMapIndex = isMappingModelToApi ? 1 : 0;
    const lambdaMapIndex = isMappingModelToApi ? 2 : 1;

    return mapping.reduce((targetObj, mapEl) => {
      if (mapEl.length === 3) {
        if (mapEl[lambdaMapIndex] !== null) {
          const result = mapEl[lambdaMapIndex](sourceObj);
          assign(targetObj, result);
        }
      } else {
        targetObj[mapEl[targetMapIndex]] = sourceObj[mapEl[sourceMapIndex]];
      }

      return targetObj;
    }, {});
  }

  mapModelToApi() {
    return this.mappingReducer(this.model, this.modelMap, true);
  }

  mapApiToModel() {
    const data = this.mappingReducer(this.model, this.modelMap, false);

    return new this.modelPrototype(data);
  }
}

export default ModelMapper
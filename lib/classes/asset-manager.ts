import { PassageAsset } from './passage-asset'
import _ from 'lodash'

export type PassageAssetMap = { [base: string]: PassageAsset }

export class AssetManager {
  private assetMap: PassageAssetMap = {}

  constructor(stardexAssets: PassageAsset[]) {
    this.assetMap = _.reduce(
      stardexAssets,
      (accum: PassageAssetMap, stardexAsset) => {
        const base = stardexAsset.getBase()
        if (
          !accum[base] ||
          accum[base].getSource() > stardexAsset.getSource()
        ) {
          accum[base] = stardexAsset
        }

        return accum
      },
      {},
    )
  }

  getAsset = (base: string) => this.assetMap[base]

  getAllAssets = () => _.values(this.assetMap)

  getHighlightAssets = () =>
    _.filter(this.getAllAssets(), (stardexAsset) => stardexAsset.isHighlight())

  getRegisteredAssets = () =>
    _.filter(this.getAllAssets(), (stardexAsset) => stardexAsset.isRegistered())

  getUnregisteredAssets = () =>
    _.filter(
      this.getAllAssets(),
      (stardexAsset) => !stardexAsset.isRegistered(),
    )
}

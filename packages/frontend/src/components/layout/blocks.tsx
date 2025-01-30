import { FC } from 'react'

import { Features } from './blocks-features'
import { TryNow } from './blocks-try-now'

const Blocks: FC = () => (
  <div data-component="Blocks" className="max-w-xLarge m-auto -mt-20 lg:mt-0">
    <Features />
    <TryNow />
  </div>
)

export { Blocks }

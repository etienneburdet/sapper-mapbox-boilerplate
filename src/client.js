import * as sapper from '@sapper/app';
import { prefetchRoutes } from '@sapper/app'

import '@/styles/global.scss'

sapper.start({
	target: document.querySelector('#sapper')
})

prefetchRoutes()
